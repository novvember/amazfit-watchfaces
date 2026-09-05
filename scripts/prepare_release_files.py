"""Extract device ZIPs using platform metadata from the ZAB manifest."""

from collections import Counter
import hashlib
import io
import json
from pathlib import Path
import re
import sys
import zipfile


def platform_label(platform):
    parts = [platform['cpuPlatform'], platform['screenResolution']]
    if any(not isinstance(part, str) or not re.fullmatch(r'[A-Za-z0-9_-]+', part)
           for part in parts):
        raise ValueError('Invalid platform name or screen resolution in manifest')
    return '-'.join(parts)


def prepare(dist):
    archives = list(dist.glob('*.zab'))
    if len(archives) != 1:
        raise ValueError('Expected exactly one ZAB archive')
    archive = archives[0]
    pending = []
    with zipfile.ZipFile(archive) as zab:
        entries = json.loads(zab.read('manifest.json'))['zpks']
        if not entries:
            raise ValueError('No ZPK packages found in manifest')
        for entry in entries:
            # A package can represent more than one platform; keep every label.
            labels = sorted({platform_label(p) for p in entry['platforms']})
            if not labels:
                raise ValueError(f"No platforms for {entry['name']}")
            package = zab.read(entry['name'])
            with zipfile.ZipFile(io.BytesIO(package)) as zpk:
                devices = [info for info in zpk.infolist()
                           if not info.is_dir() and Path(info.filename).name == 'device.zip']
                if len(devices) != 1:
                    raise ValueError(f"Expected exactly one device.zip in {entry['name']}")
                pending.append(('-'.join(labels), hashlib.sha256(package).hexdigest()[:12],
                                zpk.read(devices[0])))

    # Resolve equal platform labels before writing, so packages cannot overwrite
    # each other. Hash the actual package rather than trusting its filename.
    counts = Counter(label for label, _, _ in pending)
    outputs = {}
    for label, digest, payload in pending:
        suffix = f'{label}-{digest}' if counts[label] > 1 else label
        filename = f'{archive.stem}-{suffix}.zip'
        if filename in outputs:
            raise ValueError(f'Duplicate output filename: {filename}')
        outputs[filename] = payload
    for filename, payload in outputs.items():
        (dist / filename).write_bytes(payload)
        print(f'Created {filename}')
    print(f'Prepared {len(outputs)} device ZIP files.')


if __name__ == '__main__':
    if len(sys.argv) != 2 or not Path(sys.argv[1]).is_dir():
        sys.exit(f'Usage: {sys.argv[0]} <dist-directory>')
    try:
        prepare(Path(sys.argv[1]))
    except (OSError, ValueError, KeyError, TypeError, zipfile.BadZipFile) as error:
        sys.exit(f'Cannot prepare release files: {error}')
