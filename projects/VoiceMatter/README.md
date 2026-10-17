# VoiceMatter — Portfolio Documentation

This folder contains the complete portfolio-grade documentation for
**VoiceMatter**, a Linux press-to-record voice dictation daemon.

## Documentation Files

| # | File | Purpose | Status |
|---|------|---------|--------|
| 1 | [README.md](README.md) | Bundle index | ✅ Complete |
| 2 | [overview.md](overview.md) | Problem, audience, solution | ✅ Complete |
| 3 | [features.md](features.md) | Detailed feature list with code | ✅ Complete |
| 4 | [architecture.md](architecture.md) | System architecture + diagrams | ✅ Complete |
| 5 | [setup.md](setup.md) | Install + configure + troubleshoot | ✅ Complete |
| 6 | [requirements.md](requirements.md) | OS, hardware, software dependencies | ✅ Complete |
| 7 | [performance.md](performance.md) | Metrics + benchmarks | ✅ Complete |
| 8 | [environment-variables.md](environment-variables.md) | Env var reference | ✅ Complete |
| 9 | [known-issues.md](known-issues.md) | Bugs + limitations | ✅ Complete |
| 10 | [future.md](future.md) | Roadmap + planned features | ✅ Complete |
| 11 | [awards.md](awards.md) | Recognition + milestones | ✅ Complete |
| 12 | [media.md](media.md) | Videos, GIFs, brand assets | ✅ Complete |
| 13 | [admin_instructions.md](admin_instructions.md) | Manual tasks checklist | ✅ Complete |
| 14 | [LICENSE](LICENSE) | Proprietary license | ✅ Complete |
| 15 | [metadata.json](metadata.json) | JSON metadata for portfolio site | ✅ Complete |

## Subdirectories

| Folder | Contents |
|--------|----------|
| [screenshots/](screenshots/) | Desktop overlay PNGs + GIFs + demo MP4, README.md with capture guide |
| [config-samples/](config-samples/) | Sanitized config copies + README.md with sanitization policy |

## Quick Stats

- **Total files**: 19 (15 root + 2 READMEs in subdirs + 3 sanitized configs)
- **Total words**: ~18 000
- **Screenshots**: 0 captured (overlay rendered live by daemon — see `admin_instructions.md` Task 1)
- **Configs sanitized**: 3 files copied (`pyproject.toml`, `.env.example`, `dict.json`)

## Source

- **Project root**: `/mnt/Win/Projects/Python/VoiceMatter/`
- **Bundle generated**: 2026-08-26

## Next Steps

1. Review each documentation file for accuracy
2. Complete manual tasks in `admin_instructions.md`
3. Copy this folder to your portfolio repository
4. Deploy to your portfolio site

---

**Status values used in tables**

- ✅ Complete — file written and content valid
- ⬜ Pending — file exists but content is placeholder / not yet captured
- ⚠️ Stub — file written but content is incomplete
- ❌ Failed — file write failed