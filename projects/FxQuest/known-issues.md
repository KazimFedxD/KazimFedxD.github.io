# Known Issues & Limitations

## Current Limitations

### 1. Game State Persistence

**Issue**: In-memory game states are lost on bot restart

**Affected Features**:
- Active UNO games
- Ongoing Blackjack sessions
- Tic-Tac-Toe matches
- Rock Paper Scissors matches

**Impact**: 
- Players must restart games after bot restarts
- No resuming mid-game sessions
- Poker channels are deleted on restart

**Workaround**: 
- Finish games before bot maintenance
- Bot automatically cleans up poker channels on startup

**Status**: 
- ⚠️ Known limitation
- 🔧 Planned fix: Serialize game states to database

**Timeline**: Future version 2.0

---

### 2. Single-Instance Architecture

**Issue**: Bot cannot scale horizontally across multiple instances

**Limitations**:
- Single process handles all servers
- No load balancing possible
- SQLite database not suitable for distributed systems

**Impact**:
- Performance degradation at very large scale (1000+ servers)
- Single point of failure
- No redundancy

**Workaround**:
- Vertical scaling (more RAM/CPU)
- Shard bot if exceeding Discord limits (2500 servers)

**Status**: 
- ⚠️ Architectural limitation
- 🔧 Planned fix: PostgreSQL + Redis for multi-instance support

**Timeline**: Version 3.0 (if needed)

---

### 3. Custom Emoji Dependency

**Issue**: Minecraft features require server-specific custom emojis

**Affected Features**:
- Mining system item display
- Inventory visualization
- Tool/armor icons

**Impact**:
- Without custom emojis, features show text names instead of icons
- Emojis must be uploaded to each server manually
- `emojis.json` requires manual configuration

**Workaround**:
1. Upload emojis to your server (see `discord emojis/` folder)
2. Update `emojis.json` with emoji names and IDs
3. Alternatively, use text-only display (future option)

**Status**: 
- ⚠️ Design choice (custom emojis for branding)
- 🔧 Potential improvement: Unicode fallback emojis

**Timeline**: Version 2.1

---

### 4. Poker Channel Cleanup

**Issue**: Orphaned poker channels persist if bot crashes unexpectedly

**Affected Features**:
- Poker games

**Impact**:
- Channels remain if bot doesn't clean up gracefully
- Manual deletion required or wait for next bot restart

**Workaround**:
- Bot automatically deletes orphaned poker channels on startup
- Manual cleanup: Delete channels in poker category

**Status**: 
- ✅ Mitigated (auto-cleanup on restart)
- 🔧 Potential improvement: Periodic cleanup task

**Timeline**: Already implemented

---

### 5. No Mobile App

**Issue**: Bot is Discord-only, no standalone mobile application

**Limitations**:
- Requires Discord app to use
- Limited to Discord's UI/UX
- Cannot use outside Discord ecosystem

**Impact**:
- Users need Discord account
- Dependent on Discord's availability

**Workaround**: None (Discord bot by design)

**Status**: 
- ℹ️ Not a bug, intentional scope
- 📱 Future: Standalone API possible

**Timeline**: No current plans

---

### 6. Chat Games Timing

**Issue**: Chat games appear at random intervals (20-60 minutes)

**Limitations**:
- Cannot manually trigger chat games
- No precise scheduling
- May appear during low activity periods

**Impact**:
- Unpredictable game timing
- May not align with peak server activity

**Workaround**:
- Configure specific channel for chat games
- Adjust timing in code (`random.randint(20, 60)`)

**Status**: 
- ⚠️ Design choice (anti-spam)
- 🔧 Potential improvement: Admin command to trigger manually

**Timeline**: Version 2.2

---

### 7. Help Command Pagination

**Issue**: Help command may not display all commands if list is very long

**Affected**: Servers with many custom commands (if extended)

**Impact**:
- Limited to Discord's embed limits (25 fields max)
- Long command lists require multiple pages

**Workaround**:
- Pagination implemented
- Category-based filtering helps

**Status**: ✅ Working as intended

---

## Known Bugs

### Bug #1: Level-Up Role Assignment Delay

**Description**: Role rewards may take 2-5 seconds to assign after level up

**Severity**: 🟡 Minor

**Affected Systems**: Leveling system

**Reproduction**:
1. User levels up to milestone (5, 10, 25, 50, 100)
2. Level-up message appears immediately
3. Role assigned 2-5 seconds later

**Cause**: Discord API rate limiting on role assignments

**Workaround**: Wait a few seconds, role will be assigned

**Status**: 
- ⚠️ Discord API limitation, not bot bug
- Cannot be fully eliminated

**Fix**: None (external API limitation)

---

### Bug #2: UNO Color Picker Timeout

**Description**: Color picker for Wild cards may timeout if player is AFK

**Severity**: 🟡 Minor

**Affected Systems**: UNO game

**Reproduction**:
1. Play Wild card in UNO
2. Don't select color within timeout period
3. Game state may become stuck

**Cause**: View timeout, no fallback selection

**Workaround**: Players should select color promptly

**Status**: 
- 🔧 Needs fix
- Add default color selection on timeout

**Fix**: Planned for version 2.0.1

---

### Bug #3: Poker Buy-In Validation

**Description**: Poker buy-in doesn't check if user has sufficient funds before creating channel

**Severity**: 🟡 Minor

**Affected Systems**: Poker game

**Reproduction**:
1. User joins poker with buy-in higher than balance
2. Channel creates anyway
3. User cannot actually play

**Cause**: Balance check missing in initialization

**Workaround**: Check balance before joining

**Status**: 
- 🐛 Bug confirmed
- Fix in progress

**Fix**: Version 2.0.1

---

### Bug #4: Chat Game Answer Case Sensitivity

**Description**: Chat game answers are case-sensitive in some edge cases

**Severity**: 🟢 Trivial

**Affected Systems**: Chat games (word scramble)

**Reproduction**:
1. Chat game posts scrambled word "HELLO"
2. User types "hello" (lowercase)
3. May not be accepted

**Cause**: Inconsistent `.lower()` application

**Workaround**: Type answer in lowercase

**Status**: 
- ✅ Mostly fixed (`.lower()` added)
- May still have edge cases

**Fix**: Code review for all comparisons

---

## Platform-Specific Issues

### Windows-Specific

#### Issue: Path Separator in Database Path

**Description**: Hardcoded forward slashes in paths may cause issues on Windows

**Severity**: 🟢 Trivial

**Impact**: Rare, only if using custom database paths

**Workaround**: Use `os.path.join()` for paths

**Status**: Not affecting default setup

---

#### Issue: Process Signals for Graceful Shutdown

**Description**: SIGTERM handling differs on Windows vs Unix

**Severity**: 🟡 Minor

**Impact**: Graceful shutdown may not work on Windows

**Workaround**: Use Ctrl+C to stop bot

**Status**: Acceptable (most production bots run on Linux)

---

### macOS-Specific

#### Issue: M1/M2 ARM Architecture Compatibility

**Description**: Some dependencies may need Rosetta 2 on Apple Silicon Macs

**Severity**: 🟢 Trivial

**Impact**: Slower performance in Rosetta mode

**Workaround**: Use ARM-native Python installation

**Status**: All major dependencies now support ARM natively

---

### Linux-Specific

#### Issue: Missing Build Tools for Dependencies

**Description**: Some systems need build-essential for Python packages

**Severity**: 🟡 Minor

**Impact**: Installation may fail without build tools

**Solution**:
```bash
sudo apt install python3-dev build-essential
```

**Status**: Not a bot issue, system requirement

---

## Browser/Client Specific Issues

### Discord Desktop App

**Issue**: None known

**Status**: ✅ Fully compatible

---

### Discord Web Browser

**Issue**: None known

**Status**: ✅ Fully compatible

---

### Discord Mobile (iOS/Android)

#### Issue: Button Layout on Small Screens

**Description**: Some game interfaces with many buttons may be cramped on mobile

**Severity**: 🟡 Minor

**Affected**: Setup UI, some game interfaces

**Impact**: Usability slightly reduced on mobile

**Workaround**: Use desktop/web client for configuration

**Status**: Discord UI limitation

---

## Performance Bottlenecks

### 1. Large Leaderboard Queries

**Issue**: Fetching leaderboards for servers with 10,000+ users can be slow

**Severity**: 🟡 Minor

**Impact**: 200-500ms query time for very large servers

**Workaround**: Limit leaderboard to top 10 (already implemented)

**Status**: Acceptable performance

---

### 2. Concurrent Game Limit

**Issue**: No artificial limit on concurrent games, may cause memory issues

**Severity**: 🟡 Minor

**Impact**: Very high memory usage if hundreds of games active

**Workaround**: Monitor memory, restart if needed

**Status**: 
- 🔧 Future improvement: Add max concurrent games config

**Timeline**: Version 2.1

---

### 3. Database Write Locking

**Issue**: SQLite write locks can cause brief delays during high concurrent writes

**Severity**: 🟢 Trivial

**Impact**: < 50ms delays, rarely noticeable

**Workaround**: Enable WAL mode (Write-Ahead Logging)

**Status**: Mitigated with WAL mode

---

## Integration Limitations

### External APIs

**Issue**: No external API integrations currently

**Limitation**: Cannot fetch live data (weather, news, etc.)

**Impact**: Bot is self-contained

**Status**: Intentional design (no API key management complexity)

**Future**: May add optional integrations

---

### Third-Party Bots

**Issue**: No integration with other Discord bots

**Limitation**: Cannot share data with other bots

**Impact**: Users may need multiple bots for different features

**Status**: Intentional design

---

## Security Considerations

### Rate Limiting

**Issue**: No custom rate limiting beyond Discord's built-in limits

**Severity**: 🟡 Minor

**Impact**: Users can spam commands (limited by Discord)

**Workaround**: Use Discord's built-in slowmode in channels

**Status**: 
- 🔧 Future improvement: Custom cooldowns per command

**Timeline**: Version 2.2

---

### Permission Escalation

**Issue**: No protection against bot role being moved above admin roles

**Severity**: 🟡 Minor

**Impact**: Bot could theoretically assign higher roles than intended

**Workaround**: Keep bot role below admin roles

**Status**: Requires server owner awareness

---

## Data Limitations

### No User Data Export

**Issue**: No built-in command to export user data

**Severity**: 🟡 Minor

**Impact**: Users cannot download their profile data

**Compliance**: May be required for GDPR/privacy laws

**Workaround**: Direct database access

**Status**: 
- 🔧 Planned feature: `/export` command

**Timeline**: Version 2.2

---

### No Data Retention Policies

**Issue**: User data kept indefinitely

**Severity**: 🟡 Minor

**Impact**: Database grows over time, inactive user data remains

**Workaround**: Manual database cleanup

**Status**: 
- 🔧 Planned feature: Auto-delete inactive profiles after X months

**Timeline**: Version 2.3

---

## Discord API Limitations

### Command Sync Delays

**Issue**: Slash commands take up to 1 hour to sync globally

**Severity**: 🟡 Minor

**Impact**: New commands/changes not immediately visible

**Workaround**: Use guild-specific sync for testing

**Status**: Discord API limitation, cannot be fixed

---

### Embed Size Limits

**Issue**: Discord limits embed fields to 25, description to 4096 characters

**Severity**: 🟢 Trivial

**Impact**: Very long content requires pagination

**Workaround**: Pagination implemented for help/leaderboards

**Status**: Handled in code

---

### Message Component Limits

**Issue**: Discord allows max 25 buttons or 25 select options per message

**Severity**: 🟢 Trivial

**Impact**: Complex UIs require multiple messages

**Workaround**: Split across multiple messages if needed

**Status**: Not affecting current features

---

## Roadmap for Fixes

### Version 2.0.1 (Next Patch)
- [ ] Fix UNO color picker timeout
- [ ] Fix poker buy-in validation
- [ ] Improve chat game case sensitivity

### Version 2.1 (Minor Update)
- [ ] Add Unicode emoji fallback for Minecraft features
- [ ] Implement max concurrent games limit
- [ ] Add manual chat game trigger command

### Version 2.2 (Feature Update)
- [ ] Custom rate limiting per command
- [ ] User data export command
- [ ] Improved help command with advanced filtering

### Version 2.3 (Maintenance Update)
- [ ] Auto-cleanup inactive user data
- [ ] Database optimization utilities
- [ ] Performance monitoring dashboard

### Version 3.0 (Major Update)
- [ ] PostgreSQL migration for scalability
- [ ] Redis for distributed game state
- [ ] Multi-instance support
- [ ] Horizontal scaling capabilities

---

## Reporting Issues

### How to Report Bugs

**In-Bot Commands**:
```
/bug <title> <description>
```

**GitHub Issues**: Create issue on repository with:
- Bot version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

**Feedback Command**:
```
/feedback <title> <description>
```

---

## Workaround Summary Table

| Issue | Severity | Workaround | Fix ETA |
|-------|----------|------------|---------|
| Game state lost on restart | 🟡 Minor | Finish games before restart | v2.0 |
| Single-instance only | 🟡 Minor | Vertical scaling | v3.0 |
| Custom emoji dependency | 🟡 Minor | Upload emojis to server | v2.1 |
| Role assignment delay | 🟡 Minor | Wait 5 seconds | N/A (API limit) |
| UNO color timeout | 🟡 Minor | Select promptly | v2.0.1 |
| Poker buy-in validation | 🟡 Minor | Check balance first | v2.0.1 |
| Chat game timing | 🟡 Minor | Adjust in code | v2.2 |
| Large leaderboards slow | 🟢 Trivial | Use top 10 (default) | N/A |
| No data export | 🟡 Minor | Direct DB access | v2.2 |

---

## Conclusion

FxQuest is a stable, production-ready Discord bot with minimal known issues. Most limitations are architectural design choices or external API constraints rather than bugs. The development roadmap addresses the most impactful limitations, with regular updates planned to improve functionality and performance.

For critical bugs or security vulnerabilities, please report immediately via the in-bot `/bug` command or GitHub issues.
