#!/usr/bin/env bash
# scripts/deploy.sh — prompt for message, build, commit+push source,
# then publish the static export to the gh-pages branch.
#
# Requires `output: "export"` in next.config.mjs so `next build` writes to
# `out/`. Edit PREFIX below if your build dir differs.
#
# The gh-pages publish step uses a throwaway worktree so it never disturbs
# the current checkout and never depends on out/ being committed to history.
set -euo pipefail

cd "$(dirname "$0")/.."

PREFIX="out"
PUBLISH_BRANCH="gh-pages"

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

# Publish $PREFIX/* to $PUBLISH_BRANCH in a throwaway worktree so the
# current checkout is never disturbed and the published tree contains
# exactly what's in $PREFIX (no out/ directory itself, no source files).
WORKTREE="$(mktemp -d)"
trap 'git worktree remove --force "$WORKTREE" 2>/dev/null || true; rm -rf "$WORKTREE"' EXIT

git worktree add --detach "$WORKTREE" HEAD
(
  cd "$WORKTREE"
  # Wipe every tracked file so only the build survives. .gitignore still
  # applies to staging; safe even if it doesn't.
  git rm -rfq . 2>/dev/null || true
  shopt -s dotglob nullglob
  cp -r "$OLDPWD/$PREFIX"/* .
  git add -A
  if git diff --cached --quiet; then
    echo "Nothing to publish — $PREFIX is empty." >&2
    exit 1
  fi
  git commit -q -m "Deploy: $msg"
  git push -f origin HEAD:"$PUBLISH_BRANCH"
)

echo "Published to $PUBLISH_BRANCH."
