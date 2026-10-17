# 008 — Remove the Friends section

## Entry point

User request: "i want you to remove the friends section". The Friends feature had a desktop icon, a rootmenu entry, a PAGES window, a `friends.md` row in the virtual filesystem, and four backend-side surfaces (API route, data file, avatar resolver, asset dir). Removal is total — no replacement, no stub.

## What the Friends feature was (pre-removal)

```
desktop icon       : <div class="dicon" data-app="friends">             in box-computer-markup.ts
rootmenu entry     : <button data-app="friends">Friends</button>       in box-computer-markup.ts
PAGES.friends      : { title, addr, html }                              in box-computer-engine.ts
FS_TREE entry      : { name: 'friends.md', app: 'friends' }             in box-computer-engine.ts
ALLOWED_LINKS keys : friend-<i>-{gh,web,tw,yt,dc,em} for each friend    in box-computer-engine.ts
import             : import friendsData from '@/data/friends.json'      in box-computer-engine.ts
helper             : friendLink(i, kind) → <a data-link="friend-...">   in box-computer-engine.ts
shell ls output    : 'about.md contact.md hire.md projects/ friends.md  in box-computer-engine.ts
                      games/ .bashrc'
data               : data/friends.json (14 entries, FriendRaw[])        deleted
api                : app/api/friends/route.ts (GET → name list)         deleted
avatars            : lib/resolve-avatar.ts (FriendRaw, resolveAvatar,   deleted
                      resolveAllAvatars — friends-only)
assets             : public/friends/ (4 images)                         deleted
nav                : { label: "Friends", href: "/friends" } in           edited (config/constants.ts)
                      NAV_LINKS + FOOTER_NAV_LINKS
cron               : '/friends' in REVALIDATABLE_PATHS                   edited (app/api/cron/revalidate/route.ts)
readme             : "Adding yourself to the friends list" section       edited (README.md)
```

## Function call order (none — the feature had no entry path outside its desktop icon)

The Friends window opened via `data-app="friends"` on the desktop icon, rootmenu, or the `friends.md` file in the file-manager. With those three affordances gone, no caller can reach a now-deleted page. The only "indirect" path was `<a data-link="friend-<i>-...">` inside the PAGES HTML, but the page that produced those `<a>` tags is itself gone.

## What was specifically modified in this change cycle

**Deleted files (4):**
- `app/api/friends/route.ts` — backing API for the terminal `friends` shell command; terminal command was retired at the same time the data file was removed (no caller remains).
- `data/friends.json` — 14 entries, hand-edited via PRs per the README workflow. No other code read this file once `box-computer-engine.ts` dropped its import.
- `lib/resolve-avatar.ts` — exported `FriendRaw`, `FriendResolved`, `resolveAvatar`, `resolveAllAvatars`. Friends-only shape; the only callers were the (now-deleted) `friends` PAGES entry inside the engine. The `/api/avatar` route has its own URL-handling logic and does not depend on this file.
- `public/friends/` (4 images) — local avatars for the friends list.

**Edited files (6):**
- `components/machine/box-computer-engine.ts` — removed the `import friendsData` line, the `friends.md` slot in the shell `ls` output, the `friendsData.forEach(...)` block inside `ALLOWED_LINKS`, the `friendLink()` helper, the `friends:` entry in `PAGES`, the `friends.md` row in `FS_TREE`, and updated the surrounding `// ponytail:` comments to drop the `data/friends.json` mentions.
- `components/machine/box-computer-markup.ts` — removed the desktop icon and the rootmenu button.
- `config/constants.ts` — removed `Friends` from `NAV_LINKS` and `FOOTER_NAV_LINKS`.
- `app/api/cron/revalidate/route.ts` — removed `'/friends'` from `REVALIDATABLE_PATHS`.
- `README.md` — removed the entire "Adding yourself to the friends list" section (the entire body of the README was that section; the file is now back to a title + a one-line description + a "Tech stack" table).
- `decisions.md` — added this-cycle entry at the top of the log.

**Created files (1):**
- `docs/flows/008-remove-friends-section.md` — this file.

## What was deliberately NOT modified

- `docs/flows/006-wire-portfolio-data-into-crt.md` — historical record of the moment `portfolio_data/` was wired in. Friends were part of the engine at that time; the doc accurately describes that. Updating it to "remove friends" would lie about the work it documents. A reader following the timeline reads 006 → this 008.
- `docs/flows/007-final-brand-remnant-scrub.md` — its one `data/friends.json` mention is in the "deliberately NOT modified" section and notes the `krish-space.is-a.dev` subdomain inside the friends data. With the data file gone that subdomain is no longer rendered, so the line is a bit stale; the doc itself is still correct about what it scanned for at the time. Leaving it as history.

## Verification

A grep over the same file set as before returns zero `friend` / `friends` matches outside:
1. `decisions.md` and `docs/flows/006-*.md` — historical records (intentional).
2. `docs/flows/007-*.md` line 55 — a one-line mention noting the friends data had a personal `is-a.dev` subdomain in it (stale but harmless; the doc is historical).
3. The `projects/*/...` corpus — match is `user-friendly` in product docs, not the Friends feature.
