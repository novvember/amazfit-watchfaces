import importlib.util
import io
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch
import zipfile

SCRIPTS = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('release', SCRIPTS / 'watchface_release.py')
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)


class HistoryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.cwd = os.getcwd()
        os.chdir(self.temp.name)
        r.git('init', '-q')
        r.git('config', 'user.email', 'test@example.com')
        r.git('config', 'user.name', 'Test')
        self.write_app('alpha')
        self.write_app('beta')
        self.base = self.commit('Initial watchfaces')

    def tearDown(self):
        os.chdir(self.cwd)
        self.temp.cleanup()

    def write(self, path, data):
        p = Path(path)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(data)

    def write_app(self, name, version='1.0.0', code=1, description=''):
        self.write(f'src/watchfaces/{name}/app.json', json.dumps({'app': {
            'appName': name, 'version': {'name': version, 'code': code},
            'description': description}}))

    def commit(self, message):
        r.git('add', '.')
        r.git('commit', '-qm', message)
        return r.git('rev-parse', 'HEAD')

    def test_code_and_metadata_changes_do_not_build(self):
        self.write('src/watchfaces/alpha/index.js', 'changed')
        self.write_app('beta', description='Changed description')
        self.assertEqual(r.detect(self.base, self.commit('Edit')), [])

    def test_whole_push_and_multiple_watchfaces(self):
        self.write_app('alpha', '1.1.0')
        self.commit('Bump alpha')
        self.write('src/watchfaces/alpha/index.js', 'later commit')
        self.write_app('beta', code=2)
        self.assertEqual(r.detect(self.base, self.commit('More changes')), ['alpha', 'beta'])

    def test_added_deleted_and_initial_push(self):
        self.write_app('gamma')
        Path('src/watchfaces/beta/app.json').unlink()
        head = self.commit('Add and delete')
        self.assertEqual(r.detect(self.base, head), ['gamma'])
        self.assertEqual(r.detect('0' * 40, head), ['alpha', 'gamma'])

    def test_reverted_version_is_not_selected(self):
        self.write_app('alpha', '1.1.0')
        self.commit('Bump')
        self.write_app('alpha')
        self.assertEqual(r.detect(self.base, self.commit('Revert')), [])

    def test_published_baseline_and_notes(self):
        r.git('tag', 'alpha_1-0-0')
        self.write('src/watchfaces/alpha/index.js', 'fix')
        change = self.commit('Fix alpha')
        r.git('tag', 'alpha-v1.1.0')
        self.write('src/watchfaces/beta/index.js', 'unrelated')
        self.commit('Fix beta')
        self.write('src/utils/helper.js', 'shared')
        head = self.commit('Fix shared helper')
        items = [
            dict(tag_name='alpha_1-0-0', draft=False, prerelease=False, published_at='2025-01-01'),
            dict(tag_name='alpha-v1.1.0', draft=True, prerelease=False, published_at=None),
            dict(tag_name='beta-v9.0.0', draft=False, prerelease=False, published_at='2025-04-01'),
        ]
        previous = r.previous_release(items, 'alpha', head)
        self.assertEqual(previous['tag_name'], 'alpha_1-0-0')
        notes = r.commit_notes('alpha', head, previous, 'owner/repo')
        self.assertIn('Fix alpha', notes)
        self.assertIn(change, notes)
        self.assertIn('Fix shared helper', notes)
        self.assertNotIn('Fix beta', notes)
        self.assertNotIn('Initial watchfaces', notes)
        self.assertIn('Initial watchfaces', r.commit_notes('alpha', head, None, 'owner/repo'))

    def test_published_prerelease_is_a_valid_baseline(self):
        r.git('tag', 'alpha-v1.0.0')
        item = dict(tag_name='alpha-v1.0.0', draft=False, prerelease=True, published_at='2025-01-01')
        self.assertEqual(r.previous_release([item], 'alpha', self.base), item)

    def test_legacy_published_version_skips_build(self):
        items = [dict(tag_name='alpha_1-0-0', draft=False)]
        with patch.object(r, 'releases', return_value=items), patch.object(r, 'output') as output:
            r.prepare('alpha')
        output.assert_called_once_with('skip', 'true')

    def test_draft_retry_and_published_guard(self):
        self.write('dist-placeholder', '')
        state = dict(tag='alpha-v1.0.0', title='alpha 1.0.0', head=self.base, notes='- Commit\n')
        self.write('release-alpha.json', json.dumps(state))
        self.write('src/watchfaces/alpha/dist/build.zab', 'zab')
        self.write('src/watchfaces/alpha/dist/build-device.zip', 'zip')
        existing = dict(tag_name=state['tag'], draft=True, assets=[
            {'name': 'old.zab'}, {'name': 'old-device.zip'}, {'name': 'screenshot.png'}])
        with patch.dict(os.environ, RUNNER_TEMP=self.temp.name), \
                patch.object(r, 'releases', return_value=[existing]), \
                patch.object(r, 'metadata', return_value=({}, state['tag'])), patch.object(r, 'run') as run:
            r.draft('alpha')
            commands = [call.args for call in run.call_args_list]
            self.assertIn(('gh', 'release', 'delete-asset', state['tag'], 'old.zab', '--yes'), commands)
            self.assertFalse(any('screenshot.png' in args for args in commands))
            self.assertTrue(any(args[:3] == ('gh', 'release', 'edit') for args in commands))
            self.assertTrue(any(args[:3] == ('gh', 'release', 'upload') for args in commands))
            existing['draft'] = False
            run.reset_mock()
            r.draft('alpha')
            run.assert_not_called()

    def test_new_release_is_created_as_draft_at_build_commit(self):
        self.write_app('alpha', '1.1.0', 2)
        head = self.commit('Release alpha 1.1.0')
        with patch.dict(os.environ, RUNNER_TEMP=self.temp.name, GITHUB_REPOSITORY='owner/repo'), \
                patch.object(r, 'releases', return_value=[]), patch.object(r, 'output'):
            r.prepare('alpha')
        state = json.loads(Path('release-alpha.json').read_text())
        self.assertEqual(state['head'], head)
        self.assertIn('Release alpha 1.1.0', state['notes'])
        self.write('src/watchfaces/alpha/dist/build.zab', 'zab')
        self.write('src/watchfaces/alpha/dist/build-device.zip', 'zip')
        with patch.dict(os.environ, RUNNER_TEMP=self.temp.name), \
                patch.object(r, 'releases', return_value=[]), \
                patch.object(r, 'metadata'), patch.object(r, 'run') as run:
            r.draft('alpha')
        commands = [call.args for call in run.call_args_list]
        create = next(args for args in commands if args[:3] == ('gh', 'release', 'create'))
        self.assertIn('--draft', create)
        self.assertEqual(create[create.index('--target') + 1], head)
        self.assertEqual(create[3], 'alpha-v1.1.0')

    def test_tag_matching_does_not_mix_numbered_watchfaces(self):
        self.assertFalse(r.belongs_to('spin-2_1-1-0', 'spin'))
        self.assertFalse(r.belongs_to('glyph-matrix-2-v1.0.0', 'glyph-matrix'))
        self.assertTrue(r.belongs_to('spin_2-1-0', 'spin'))
        self.assertTrue(r.belongs_to('anicorn_1-2-0', 'anicorn-k452-nemesis'))


class ArchiveTests(unittest.TestCase):
    def prepare_archive(self, root, valid=True):
        payload = io.BytesIO()
        with zipfile.ZipFile(payload, 'w') as zpk:
            zpk.writestr('device.zip' if valid else 'wrong.txt', b'device bytes')
        with zipfile.ZipFile(Path(root, 'build.zab'), 'w') as zab:
            zab.writestr('device.zpk', payload.getvalue())

    def test_extract_and_missing_device_failure(self):
        for valid in (True, False):
            with self.subTest(valid=valid), tempfile.TemporaryDirectory() as root:
                self.prepare_archive(root, valid)
                result = subprocess.run(['bash', str(SCRIPTS / 'prepare_release_files.sh'), root],
                                        capture_output=True, text=True)
                self.assertEqual(result.returncode == 0, valid, result.stderr)
                if valid:
                    self.assertEqual(Path(root, 'build-device.zip').read_bytes(), b'device bytes')

    def test_empty_and_ambiguous_archives_fail(self):
        with tempfile.TemporaryDirectory() as root:
            for files in ([], ['one.zab', 'two.zab']):
                for filename in files:
                    Path(root, filename).touch()
                result = subprocess.run(['bash', str(SCRIPTS / 'prepare_release_files.sh'), root],
                                        capture_output=True)
                self.assertNotEqual(result.returncode, 0)


if __name__ == '__main__':
    unittest.main()
