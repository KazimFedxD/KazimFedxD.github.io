#!/usr/bin/env bash
# scripts/deploy.sh — prompt for message, build, commit+push source,
# then subtree-publish the static export to the gh-pages branch.
#
# Requires `output: "export"` in next.config.mjs so `next build` writes to
# `out/` (the subtree prefix). Edit PREFIX below if your build dir differs.
set -euo pipefail

cd "$(dirname "$0")/.."

PREFIX="out"

read -r -p "Commit message: " msg
if [ -z "$msg" ]; then
  echo "Commit message required." >&2
  exit 1
fi

npm run build

git add -A
if ! git diff --cached --quiet; then
  git commit -m "$msg"
  git push
else
  echo "No source changes to commit; skipping commit/push."
fi

if [ ! -d "$PREFIX" ]; then
  echo "Build directory '$PREFIX' not found." >&2
  echo "Set output: 'export' in next.config.mjs, or change PREFIX in this script." >&2
  exit 1
fi

# Force-push to overwrite a stale gh-pages branch when subtree refuses
# to fast-forward (e.g. after a manual reset). Safe because gh-pages is
# purely a build artifact branch.
git push origin "$(git subtree split --prefix "$PREFIX" HEAD)":gh-pages --force
