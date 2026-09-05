"""Select version changes and prepare per-watchface GitHub release drafts.

Uses Python's standard library, Git, and the GitHub CLI supplied by the runner.
Run from the repository root. No GitHub writes occur before the draft command.
"""

import json
import os
from pathlib import Path
import re
import subprocess
import sys


# Older releases predate the current directory names.
LEGACY_NAMES = {
    "11-weeks": ["11_weeks"],
    "anicorn-k452-nemesis": ["anicorn"],
    "concentric-data": ["concectric-data"],
    "glyph-matrix": ["nothing-glyphs"],
    "nothing-sector": ["sektor"],
    "spin": ["spin-1"],
    "x-shock": ["g-shock"],
}


def run(*args):
    return subprocess.check_output(args, text=True).strip()


def git(*args):
    return run("git", *args)


def output(key, value):
    print(f"{key}={value}")
    if os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a") as stream:
            stream.write(f"{key}={value}\n")


def manifest(revision, watchface):
    return json.loads(git("show", f"{revision}:src/watchfaces/{watchface}/app.json"))["app"]


def detect(before, after):
    # A newly created branch has no previous tree. Added watchfaces are first releases.
    if set(before) == {"0"}:
        before = run("git", "hash-object", "-t", "tree", "/dev/null")
    files = git("diff", "--name-only", "--diff-filter=AM", before, after,
                "--", "src/watchfaces/*/app.json").splitlines()
    selected = []
    for filename in files:
        match = re.fullmatch(r"src/watchfaces/([a-z0-9-]+)/app.json", filename)
        if not match:
            continue
        watchface = match[1]
        current = manifest(after, watchface)["version"]
        exists = subprocess.run(
            ["git", "cat-file", "-e", f"{before}:{filename}"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        ).returncode == 0
        previous = manifest(before, watchface)["version"] if exists else None
        if previous is None or any(current[key] != previous[key] for key in ("name", "code")):
            selected.append(watchface)
    return sorted(selected)


def releases():
    pages = json.loads(run("gh", "api", "--paginate", "--slurp",
                           f"repos/{os.environ['GITHUB_REPOSITORY']}/releases?per_page=100"))
    return [release for page in pages for release in page]


def belongs_to(tag, watchface):
    names = [watchface, *LEGACY_NAMES.get(watchface, [])]
    return any(re.fullmatch(re.escape(name) + r"(?:-v|_|-)[0-9]+(?:[.-][0-9]+)*", tag)
               for name in names)


def previous_release(items, watchface, head):
    candidates = sorted(
        (r for r in items if not r["draft"]
         and belongs_to(r["tag_name"], watchface)),
        key=lambda r: r["published_at"], reverse=True,
    )
    for release in candidates:
        ref = f"refs/tags/{release['tag_name']}"
        # Fetch only if publication happened after checkout's initial fetch.
        if subprocess.run(["git", "show-ref", "--verify", "--quiet", ref]).returncode:
            git("fetch", "origin", f"{ref}:{ref}")
        if subprocess.run(["git", "merge-base", "--is-ancestor", ref, head]).returncode == 0:
            return release
    return None


def commit_notes(watchface, head, previous, repository):
    revision = f"refs/tags/{previous['tag_name']}..{head}" if previous else head
    paths = [f"src/watchfaces/{watchface}", "src/adapters", "src/utils", "src/types"]
    # Keep merge commits too: conflict resolutions can change the resulting watchface.
    lines = git("log", "--reverse", "--format=%H %s", revision, "--", *paths).splitlines()
    return "\n".join(
        f"- {subject} ([{sha[:7]}](https://github.com/{repository}/commit/{sha}))"
        for sha, subject in (line.split(" ", 1) for line in lines)
    ) + "\n"


def metadata(watchface):
    if not re.fullmatch(r"[a-z0-9-]+", watchface):
        raise ValueError("Invalid watchface directory")
    app = manifest("HEAD", watchface)
    version = app["version"]["name"]
    if not re.fullmatch(r"[0-9]+(?:\.[0-9]+)*", version):
        raise ValueError(f"Unsupported version name: {version}")
    return app, f"{watchface}-v{version}"


def prepare(watchface):
    app, tag = metadata(watchface)
    items = releases()
    # Recognize a published copy of the same version under a legacy tag as well.
    version = app["version"]["name"].replace("-", ".")
    same_version = [r for r in items if belongs_to(r["tag_name"], watchface)
                    and re.search(r"(?:-v|_|-)([0-9]+(?:[.-][0-9]+)*)$", r["tag_name"])[1]
                    .replace("-", ".") == version]
    if any(not r["draft"] for r in same_version):
        output("skip", "true")
        print(f"Version {version} is already published; skipping {watchface}.")
        return
    head = git("rev-parse", "HEAD")
    # Never silently attach a different build to an existing tag.
    ref = f"refs/tags/{tag}"
    if subprocess.run(["git", "show-ref", "--verify", "--quiet", ref]).returncode == 0:
        if git("rev-parse", f"{ref}^{{commit}}") != head:
            raise ValueError(f"Tag {tag} points to another commit; use a new version name")
    previous = previous_release(items, watchface, head)
    notes = commit_notes(watchface, head, previous, os.environ["GITHUB_REPOSITORY"])
    state = {"tag": tag, "title": f"{app['appName']} {version}", "head": head, "notes": notes}
    Path(os.environ.get("RUNNER_TEMP", "/tmp"), f"release-{watchface}.json").write_text(
        json.dumps(state), encoding="utf-8")
    output("skip", "false")


def draft(watchface):
    metadata(watchface)
    state = json.loads(Path(os.environ.get("RUNNER_TEMP", "/tmp"),
                                 f"release-{watchface}.json").read_text())
    dist = Path("src/watchfaces", watchface, "dist")
    archives = sorted(dist.glob("*.zab"))
    zips = sorted(dist.glob("*.zip"))
    if len(archives) != 1 or not zips:
        raise ValueError("Expected one ZAB and prepared device ZIP files")
    items = releases()
    existing = next((r for r in items if r["tag_name"] == state["tag"]), None)
    if existing and not existing["draft"]:
        print("Release was published during the build; leaving it unchanged.")
        return
    notes_file = Path(os.environ.get("RUNNER_TEMP", "/tmp"), f"notes-{watchface}.md")
    notes_file.write_text(state["notes"], encoding="utf-8")
    if existing:
        # Remove old timestamped files, so a retry leaves exactly one set of assets.
        for asset in existing["assets"]:
            if not asset["name"].endswith((".zab", ".zip")):
                continue
            run("gh", "release", "delete-asset", state["tag"], asset["name"], "--yes")
        run("gh", "release", "edit", state["tag"], "--draft", "--title", state["title"],
            "--target", state["head"], "--notes-file", str(notes_file))
    else:
        run("gh", "release", "create", state["tag"], "--draft", "--latest=false",
            "--title", state["title"], "--target", state["head"], "--notes-file", str(notes_file))
    run("gh", "release", "upload", state["tag"], *map(str, archives + zips))


if __name__ == "__main__":
    command = sys.argv[1]
    if command == "detect":
        output("watchfaces", json.dumps(detect(*sys.argv[2:])))
    elif command == "prepare":
        prepare(sys.argv[2])
    elif command == "draft":
        draft(sys.argv[2])
    else:
        raise ValueError(f"Unknown command: {command}")
