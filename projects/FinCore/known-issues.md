# Known Issues & Limitations# Known Issues & Limitations



This document tracks current bugs, limitations, platform-specific issues, and planned fixes for FinCore.## Current Limitations



**Last Updated**: November 22, 2025 (v0.1.0-alpha)### Feature Completeness



---#### ❌ Mobile App Not Available

- **Status**: Planned for Q3 2026

## Table of Contents- **Current**: Web-only (responsive design works on mobile browsers)

- **Impact**: Limited mobile experience compared to native app

1. [Current Limitations](#current-limitations)- **Workaround**: Add to home screen (PWA functionality planned)

2. [Known Bugs](#known-bugs)- **Timeline**: iOS and Android apps in development roadmap

3. [Platform-Specific Issues](#platform-specific-issues)

4. [Browser Compatibility Issues](#browser-compatibility-issues)---

5. [Performance Bottlenecks](#performance-bottlenecks)

6. [Security Considerations](#security-considerations)#### ❌ Islamic Finance Features Not Implemented

7. [Workarounds](#workarounds)- **Missing Features**:

  - Khums calculations

---  - Zakat calculations

  - Nisab tracking

## Current Limitations  - Lunar calendar integration

- **Status**: Core feature planned for Q1 2026

### Feature Limitations- **Impact**: Users must calculate Islamic obligations manually

- **Timeline**: Priority feature for next major release (v0.2.0)

#### 1. No Mobile Application

---

**Status**: ❌ Not implemented

#### ⚠️ Limited Reporting Capabilities

**Description**: FinCore is currently web-only. No native mobile apps for iOS or Android.- **Current**: Basic summaries and category breakdowns

- **Missing**:

**Impact**: Users must access via mobile browser, which has limitations:  - Date range filtering

- No offline support  - Visual charts and graphs

- No push notifications  - Trend analysis

- No biometric authentication  - Export to PDF/Excel

- Limited performance on slower devices  - Custom report builder

- **Impact**: Users can't analyze historical trends easily

**Workaround**: Use Progressive Web App (PWA) features (install to home screen on Android/iOS).- **Workaround**: Export data via Django admin panel (requires superuser)

- **Timeline**: Charts planned for Q1 2026, exports for Q2 2026

**Planned Fix**: v0.4.0 (Q3 2026) - React Native mobile apps for iOS and Android.

---

---

#### ❌ No Budget Planning Tools

#### 2. Islamic Finance Features Incomplete- **Missing**:

  - Monthly budget limits

**Status**: ⚠️ Partially implemented  - Budget vs actual comparisons

  - Spending alerts

**Description**: Khums and Zakat calculation features are not yet implemented.  - Savings goals tracking

- **Status**: Planned for Q2 2026

**Impact**: Users interested in Islamic finance tracking must calculate manually.- **Impact**: Users must track budgets externally

- **Workaround**: Use Categories as manual budget groups

**Workaround**: 

- Create custom categories named "Zakat Paid", "Khums Paid"---

- Manually calculate amounts using external calculator

- Track payments as regular expenses#### ❌ No Receipt/Document Storage

- **Missing**: File upload for receipts, invoices, documents

**Planned Fix**: v0.2.0 (Q1 2026) - Automatic Khums/Zakat calculation with configurable rates.- **Status**: MinIO integration planned for Q2 2026

- **Impact**: No proof of transaction storage

---- **Workaround**: Store receipts separately (file system, cloud storage)

- **Technical**: Requires MinIO Docker service addition

#### 3. No Data Export Feature

---

**Status**: ❌ Not implemented

### Data Management

**Description**: Cannot export transactions to CSV, Excel, or PDF.

#### ⚠️ No Data Export Functionality

**Impact**: Users cannot back up data locally or import into other tools.- **Current**: Data locked in database

- **Missing**: Export to CSV, Excel, JSON

**Workaround**: - **Impact**: Difficult to migrate data or create backups

- Access PostgreSQL database directly:- **Workaround**: 

  ```bash  - Superuser can export via Django admin

  docker-compose exec db psql -U fincore_user fincore_db  - Direct database access via `docker-compose exec db pg_dump`

  \copy api_income TO '/tmp/incomes.csv' CSV HEADER;- **Timeline**: Q2 2026

  \copy api_expense TO '/tmp/expenses.csv' CSV HEADER;

  ```---

- Use Django admin panel to manually copy data

#### ⚠️ No Bulk Import

**Planned Fix**: v0.3.0 (Q2 2026) - Export to CSV, Excel, and PDF with formatting.- **Missing**: Import transactions from CSV, bank statements

- **Impact**: Manual entry required for historical data

---- **Workaround**: Use Django admin for bulk creation (technical users)

- **Timeline**: Q2 2026

#### 4. No Recurring Transactions

---

**Status**: ❌ Not implemented

#### ❌ No Audit Log

**Description**: Cannot set up recurring income/expenses (e.g., monthly rent, salary).- **Missing**: History of edits, deletions

- **Impact**: Can't track who changed what or when

**Impact**: Users must manually enter repeated transactions each period.- **Use Case**: Important for shared accounts (future feature)

- **Timeline**: Q3 2026 (with multi-user support)

**Workaround**: Manually add transactions each month. Use browser autofill to speed up entry.

---

**Planned Fix**: v0.5.0 (Q4 2026) - Recurring transaction templates with auto-creation via Celery Beat.

### User Experience

---

#### ⚠️ No Undo Functionality

#### 5. Single Currency Support- **Current**: Deletion is permanent (database-level)

- **Impact**: Accidental deletions can't be reversed

**Status**: ⚠️ Limitation- **Workaround**: Confirmation dialogs before deletion

- **Timeline**: Soft deletes planned for Q2 2026

**Description**: All amounts stored as decimal numbers without currency designation.

---

**Impact**: Users in multi-currency environments cannot track exchanges or conversions.

#### ⚠️ Limited Search Functionality

**Workaround**: - **Current**: No search bar

- Use separate user accounts for each currency- **Missing**: Search transactions by description, amount, date

- Manually convert to single base currency before entry- **Impact**: Users must scroll through long lists

- Add currency symbol in transaction notes- **Workaround**: Use browser's "Find in page" (Ctrl+F)

- **Timeline**: Q1 2026

**Planned Fix**: v0.4.0 (Q3 2026) - Multi-currency support with exchange rates.

---

---

#### ⚠️ No Keyboard Shortcuts

#### 6. Limited Date Filtering- **Current**: Mouse/touch only navigation

- **Missing**: Keyboard shortcuts for common actions

**Status**: ⚠️ Basic implementation- **Impact**: Slower workflow for power users

- **Examples**: `N` for new income, `/` for search

**Description**: Reports show all-time data only. No date range filtering (e.g., "Last 30 days", "This month").- **Timeline**: Q3 2026



**Impact**: Users with large datasets see cluttered reports.---



**Workaround**: Use browser DevTools to filter data client-side (advanced users only).### Performance



**Planned Fix**: v0.2.0 (Q1 2026) - Date range picker with presets (today, week, month, year, custom).#### ⚠️ No Pagination

- **Current**: Loads all transactions at once

---- **Impact**: Slow performance with > 1000 transactions

- **Workaround**: None currently

#### 7. No Budget Tracking- **Timeline**: Q1 2026 (with infinite scroll or traditional pagination)



**Status**: ❌ Not implemented---



**Description**: Cannot set budget limits per category or track spending against budgets.#### ⚠️ No Caching

- **Current**: Redis available but not used

**Impact**: Users cannot receive alerts when approaching budget limits.- **Impact**: Reports re-calculate on every page load

- **Workaround**: Refresh button allows manual control

**Workaround**: Manually track budgets in spreadsheet alongside FinCore.- **Timeline**: Q1 2026 (cache report data with 5-min TTL)



**Planned Fix**: v0.3.0 (Q2 2026) - Budget creation with overspend alerts via email.---



---### Security



#### 8. No Receipt Storage#### ⚠️ No Two-Factor Authentication (2FA)

- **Current**: Email + password only

**Status**: ❌ Not implemented- **Missing**: TOTP (Google Authenticator), SMS, backup codes

- **Impact**: Lower account security

**Description**: Cannot upload or attach receipt images/PDFs to transactions.- **Workaround**: Use strong passwords

- **Timeline**: Q3 2026

**Impact**: Users must store receipts separately (physical or external cloud storage).

---

**Workaround**: Use Google Drive/Dropbox to store receipts, add link in transaction notes.

#### ⚠️ No Password Strength Indicator

**Planned Fix**: v0.3.0 (Q2 2026) - File upload with AWS S3 or local storage.- **Current**: Django default validation only

- **Missing**: Visual strength meter during registration

---- **Impact**: Users may choose weak passwords

- **Workaround**: Django enforces minimum requirements

#### 9. Single User Focus- **Timeline**: Q2 2026



**Status**: ⚠️ By design---



**Description**: No multi-user households or shared accounts. Each user account is isolated.#### ❌ No Session Management

- **Missing**: View active sessions, logout all devices

**Impact**: Families must use separate accounts or share one login (not recommended for security).- **Current**: Tokens expire after 7 days (auto-logout)

- **Impact**: Can't manually revoke access if device stolen

**Workaround**: - **Workaround**: Change password to invalidate all tokens

- Create shared account with shared credentials (security risk)- **Timeline**: Q2 2026

- Use categories to distinguish household members (e.g., "Groceries - Alice", "Groceries - Bob")

---

**Planned Fix**: Not planned. FinCore is designed for individual use. May reconsider in v2.0.0+.

## Known Bugs

---

### High Priority 🔴

#### 10. No Bank Integration / Auto-Import

#### Bug #1: Category Deletion Orphans Transactions

**Status**: ❌ Not implemented- **Status**: ⚠️ **Known Issue**

- **Description**: Deleting a category sets transactions' category to `null`

**Description**: Cannot connect to bank accounts for automatic transaction import (Plaid, Yodlee, etc.).- **Impact**: Transactions show "Uncategorized" in reports

- **Root Cause**: `on_delete=SET_NULL` in model definition

**Impact**: All transactions must be entered manually.- **Affected Versions**: All current versions

- **Workaround**: Don't delete categories with existing transactions

**Workaround**: None. Manual entry is the only option currently.- **Fix**: Planned for v0.2.0 - prevent deletion or reassign transactions

- **Reported**: Internal testing

**Planned Fix**: v2.0.0+ (2027+) - Bank integration is a major feature requiring significant development and compliance considerations.

---

---

### Medium Priority 🟡

### Technical Limitations

#### Bug #2: Dashboard Balance Color Glitch

#### 11. Docker-Only Deployment- **Status**: ⏳ **Under Investigation**

- **Description**: Balance card flickers between blue/orange on exactly $0.00

**Status**: ⚠️ By design- **Impact**: Visual annoyance only, no functional issue

- **Root Cause**: React re-render with floating-point comparison

**Description**: Official deployment method is Docker Compose only. Manual setup possible but unsupported.- **Affected**: Dashboard page only

- **Workaround**: None needed (cosmetic issue)

**Impact**: Users without Docker experience may struggle with setup.- **Fix**: Planned for v0.1.1

- **Reported**: Internal testing

**Workaround**: Follow `setup.md` for Docker installation, or run Django/React separately (advanced).

---

**Planned Fix**: None. Docker simplifies deployment and is industry standard.

#### Bug #3: Email Verification Code Expiration

---- **Status**: ⚠️ **By Design** (but confusing)

- **Description**: Verification codes expire after 10 minutes

#### 12. No Horizontal Scaling (Yet)- **Impact**: Users must request new code if they wait too long

- **Root Cause**: Celery Beat clears expired tokens every minute

**Status**: ⚠️ Single container per service- **Affected**: Registration flow

- **Workaround**: Check email immediately after registration

**Description**: Backend runs as single Django container. Cannot scale horizontally without manual configuration.- **Fix**: Add expiration warning in UI (Q1 2026)

- **Reported**: User feedback

**Impact**: Performance degrades at 200+ concurrent users (see `performance.md`).

---

**Workaround**: Manually configure multiple backend containers in `docker-compose.yml` with Nginx load balancing.

### Low Priority 🟢

**Planned Fix**: v1.0.0 (Q1 2027) - Official load balancing configuration with auto-scaling support.

#### Bug #4: Safari Date Picker Styling

---- **Status**: ✅ **Won't Fix** (browser limitation)

- **Description**: Date input appears unstyled on iOS Safari < 15

#### 13. SQLite Not Supported- **Impact**: Visual inconsistency on older iOS devices

- **Root Cause**: Safari doesn't support custom date input styling

**Status**: ❌ PostgreSQL only- **Affected**: iOS Safari 14 and below

- **Workaround**: Use text input or update iOS

**Description**: Backend requires PostgreSQL. Cannot use SQLite for simpler deployments.- **Fix**: None (browser issue)

- **Reported**: iOS testing

**Impact**: Slightly more complex setup compared to file-based databases.

---

**Workaround**: None. PostgreSQL is required for production-grade features (JSONB, full-text search planned).

## Platform-Specific Issues

**Planned Fix**: None. PostgreSQL is the target database.

### Windows (Docker Desktop)

---

#### Issue: Slow Performance on Mounted Volumes

## Known Bugs- **Description**: Hot-reload and file operations are slow

- **Root Cause**: NTFS-to-ext4 filesystem translation overhead

### High Priority 🔴- **Impact**: 2-5 second delay on file saves

- **Workaround**: 

#### Bug #1: Email Verification Link Expires Too Quickly  - Use WSL2 filesystem (clone repo inside Ubuntu)

  - Or disable hot-reload: `CHOKIDAR_USEPOLLING=false`

**Status**: 🐛 Confirmed- **Status**: Docker Desktop limitation, not fixable by app



**Affected Versions**: v0.1.0-alpha---



**Description**: Email verification tokens expire in 15 minutes. Some users don't check email immediately.### macOS (Docker Desktop)



**Reproduction Steps**:#### Issue: High CPU Usage

1. Register new account- **Description**: Docker Desktop consumes 20-30% CPU idle

2. Wait 20 minutes- **Root Cause**: VM overhead for Docker on macOS

3. Click verification link in email- **Impact**: Battery drain on laptops

4. Error: "Invalid or expired verification code"- **Workaround**: 

  - Reduce Docker memory allocation in settings

**Impact**: Medium - Users must re-register or request new verification email (not implemented yet).  - Stop Docker when not developing

- **Status**: Docker Desktop limitation

**Workaround**: Check email within 15 minutes of registration.

---

**Planned Fix**: v0.2.0 - Extend token expiry to 24 hours + add "Resend verification email" button.

### Linux

**Technical Details**:

```python#### Issue: Permission Errors on Volumes

# Current implementation in usermanagement/views.py- **Description**: `Permission denied` when writing to `postgres_data/`

code_expiry = timezone.now() + timedelta(minutes=15)  # Too short- **Root Cause**: Docker volume ownership mismatch

- **Impact**: PostgreSQL won't start

# Planned fix:- **Fix**: 

code_expiry = timezone.now() + timedelta(hours=24)  # More reasonable  ```bash

```  sudo chown -R $(whoami):$(whoami) postgres_data/

  # Or remove and recreate: docker-compose down -v

---  ```

- **Status**: ✅ Documented workaround

#### Bug #2: Category Deletion Cascades Without Warning

---

**Status**: 🐛 Confirmed

## Browser Compatibility Issues

**Affected Versions**: v0.1.0-alpha

### Internet Explorer

**Description**: Deleting a category with child categories or associated transactions deletes everything without confirmation.- **Status**: ❌ **Not Supported**

- **Reason**: Deprecated by Microsoft, lacks ES6+ support

**Reproduction Steps**:- **Impact**: Application won't load

1. Create parent category "Expenses"- **Workaround**: Use modern browser (Chrome, Firefox, Edge)

2. Create child category "Groceries" under "Expenses"

3. Add 10 expense transactions to "Groceries"---

4. Delete "Expenses" category

5. All child categories and transactions are deleted### Safari 12-13 (macOS Mojave/Catalina)

- **Issue**: Glassmorphic effects not working

**Impact**: High - Permanent data loss without undo.- **Cause**: `backdrop-filter` not supported

- **Impact**: Cards appear solid instead of transparent

**Workaround**: - **Workaround**: Update to Safari 14+ or use Chrome

- Be extremely careful when deleting categories- **Status**: ⚠️ Limited support, visual degradation only

- Backup database before deleting:

  ```bash---

  docker-compose exec db pg_dump -U fincore_user fincore_db > backup.sql

  ```### Firefox Private Browsing

- **Issue**: LocalStorage disabled by default

**Planned Fix**: v0.2.0 - Add confirmation dialog showing:- **Impact**: Session persistence may not work

- Number of child categories- **Workaround**: Enable LocalStorage in Firefox settings or use normal mode

- Number of affected transactions- **Status**: ✅ User configuration issue

- Option to reassign transactions to different category

---

**Technical Details**: Django's `on_delete=CASCADE` is too aggressive. Need soft delete or reassignment logic.

## Database Limitations

---

### SQLite (Development Only)

#### Bug #3: JWT Refresh Token Not Rotated- **Issue**: Concurrent writes cause `database is locked` errors

- **Impact**: Celery tasks fail with database errors

**Status**: 🐛 Confirmed- **Root Cause**: SQLite doesn't support concurrent writes

- **Fix**: Use PostgreSQL (as recommended in setup)

**Affected Versions**: v0.1.0-alpha- **Status**: ✅ Documented, not a bug



**Description**: Refresh tokens are valid for 7 days but never rotated. If stolen, they remain valid until expiry.---



**Impact**: Medium - Security risk if refresh token is compromised.### PostgreSQL Connection Limit

- **Current**: 20 connections (default pool size)

**Workaround**: - **Impact**: Exceeding limit causes connection errors

- Log out and log back in periodically to get new refresh token- **Scenario**: > 20 simultaneous users on single Django instance

- Monitor login activity manually- **Workaround**: 

  - Increase pool size in settings

**Planned Fix**: v0.3.0 - Implement refresh token rotation (new refresh token issued with each access token refresh).  - Deploy multiple Django instances

- **Status**: ✅ Scalability consideration

**Technical Details**:

```python---

# Current: refresh token reused indefinitely

# Planned: rotate on each use## API Limitations

SIMPLE_JWT = {

    'ROTATE_REFRESH_TOKENS': True,### No Rate Limiting

    'BLACKLIST_AFTER_ROTATION': True,- **Current**: Unlimited requests per user

}- **Impact**: Potential abuse or DDoS

```- **Workaround**: Use Nginx rate limiting (production)

- **Timeline**: Q2 2026 (Django rate limiting middleware)

---

---

### Medium Priority 🟡

### No API Versioning

#### Bug #4: Date Picker Inconsistent Across Browsers- **Current**: All endpoints at `/api/*`

- **Impact**: Breaking changes affect all clients

**Status**: 🐛 Confirmed- **Workaround**: None currently

- **Timeline**: Q2 2026 (`/api/v2/` for future changes)

**Affected Browsers**: Safari (iOS/macOS), Firefox (Windows)

---

**Description**: HTML5 date input `<input type="date">` renders differently across browsers. Safari shows unstyled picker.

### No Webhook Support

**Impact**: Minor - Functional but inconsistent UX.- **Missing**: Webhooks for transaction events

- **Use Case**: Integration with other services

**Workaround**: Use browser's native date picker (works, just looks different).- **Timeline**: Q4 2026 (if demand exists)



**Planned Fix**: v0.2.0 - Replace with custom date picker component (react-datepicker).---



**Screenshot**: See `.website/screenshots/date-picker-issue.png` (to be added).## Deployment Limitations



---### No CI/CD Pipeline

- **Current**: Manual deployment only

#### Bug #5: Dashboard Briefly Shows Stale Data After Transaction Add- **Impact**: Slower releases, higher risk of errors

- **Timeline**: Q2 2026 (GitHub Actions for automated testing/deployment)

**Status**: 🐛 Confirmed

---

**Description**: After adding income/expense, dashboard still shows old totals for 1-2 seconds until re-fetch completes.

### No Health Checks

**Reproduction Steps**:- **Missing**: `/health/` endpoint for monitoring

1. Go to dashboard (shows total income: $5,000)- **Impact**: Load balancers can't detect unhealthy instances

2. Add new income ($1,000)- **Workaround**: Use `/api/report/` as health check (requires auth)

3. Return to dashboard- **Timeline**: Q1 2026

4. Dashboard briefly shows $5,000, then updates to $6,000

---

**Impact**: Minor - Visual inconsistency, but data is eventually correct.

### No Database Backups

**Workaround**: Manually refresh page after adding transactions.- **Current**: No automated backup system

- **Impact**: Data loss risk

**Planned Fix**: v0.2.0 - Optimistically update dashboard state before API response (optimistic UI updates).- **Workaround**: Manual pg_dump:

  ```bash

**Technical Details**:  docker-compose exec db pg_dump -U fincore_user fincore_db > backup.sql

```javascript  ```

// Current: Wait for API response, then fetch dashboard- **Timeline**: Q2 2026 (automated daily backups)

await createIncome(data);

fetchDashboard();  // Delay visible to user---



// Planned: Update local state immediately## Workarounds Summary

setReportData(prev => ({ ...prev, totalIncome: prev.totalIncome + amount }));

await createIncome(data);| Issue | Workaround | Permanent Fix ETA |

fetchDashboard();  // Fetch to confirm, but UI already updated|-------|-----------|-------------------|

```| No data export | Use Django admin or pg_dump | Q2 2026 |

| No search | Browser Find (Ctrl+F) | Q1 2026 |

---| Slow Windows Docker | Use WSL2 filesystem | N/A (Docker issue) |

| Category deletion orphans | Don't delete categories | Q2 2026 |

#### Bug #6: Long Category Names Overflow on Mobile| No pagination | Limit initial data entry | Q1 2026 |

| No 2FA | Use strong passwords | Q3 2026 |

**Status**: 🐛 Confirmed| SQLite locking | Use PostgreSQL | ✅ Documented |



**Affected Devices**: Mobile devices (<400px width)---



**Description**: Category names longer than 20 characters overflow their container on mobile screens.## Reporting Issues



**Impact**: Minor - Text is cut off, but still readable by clicking into category.If you encounter a bug not listed here:



**Workaround**: Use shorter category names (<20 characters).1. **Check GitHub Issues**: https://github.com/KazimFedxD/FinCore/issues

2. **Search Existing**: Your issue may already be reported

**Planned Fix**: v0.2.0 - Add CSS `text-overflow: ellipsis` or word wrapping.3. **Create New Issue**:

   - **Title**: Clear description (e.g., "Dashboard crashes when income > $10,000")

**Technical Details**:   - **Steps to Reproduce**: Exact steps that trigger the bug

```css   - **Expected Behavior**: What should happen

/* Current: No overflow handling */   - **Actual Behavior**: What actually happens

.category-name {   - **Environment**: OS, browser, Docker version

  font-size: 1rem;   - **Screenshots**: If applicable

}

---

/* Planned fix */

.category-name {## Future Fixes Roadmap

  overflow: hidden;

  text-overflow: ellipsis;### Q1 2026

  white-space: nowrap;- [ ] Add pagination for transactions

  max-width: 100%;- [ ] Implement search functionality

}- [ ] Add report caching (Redis)

```- [ ] Islamic finance calculations (Khums, Zakat)

- [ ] Visual charts and graphs

---

### Q2 2026

### Low Priority 🟢- [ ] Data export (CSV, Excel)

- [ ] Bulk import from CSV

#### Bug #7: Console Warnings in Development Mode- [ ] Receipt storage (MinIO)

- [ ] Soft deletes (undo functionality)

**Status**: 🐛 Known, low priority- [ ] Budget planning tools



**Description**: React 19 shows warnings about deprecated lifecycle methods in Framer Motion.### Q3 2026

- [ ] Two-factor authentication

**Example**:- [ ] Mobile apps (iOS, Android)

```- [ ] Keyboard shortcuts

Warning: componentWillReceiveProps has been renamed, and is not recommended for use.- [ ] Audit logging

```

### Q4 2026

**Impact**: None - Warnings only, no functional impact.- [ ] Multi-currency support

- [ ] Shared accounts (family/team)

**Workaround**: Ignore warnings (they're from third-party library, not our code).- [ ] API webhooks

- [ ] Advanced analytics

**Planned Fix**: Wait for Framer Motion update to React 19 (upstream issue).

---

---

## Performance Bottlenecks

#### Bug #8: Empty State Messages Could Be More Helpful

### Known Performance Issues

**Status**: 🐛 Enhancement request

#### Large Dataset Performance

**Description**: When no transactions exist, pages show generic "No data" message without guidance.- **Threshold**: > 1,000 transactions

- **Impact**: Slow dashboard load (> 2 seconds)

**Impact**: Minor - Confusing for new users.- **Cause**: No pagination, loads all records

- **Workaround**: Limit data entry for now

**Workaround**: Read documentation.- **Fix**: Q1 2026 (pagination + query optimization)



**Planned Fix**: v0.2.0 - Add helpful empty states with CTA buttons (e.g., "Add your first income").---



---#### Report Generation

- **Current**: Re-calculates on every page load

## Platform-Specific Issues- **Impact**: Unnecessary database queries

- **Cause**: No caching layer

### Windows Issues- **Workaround**: Use refresh button sparingly

- **Fix**: Q1 2026 (Redis caching with 5-min TTL)

#### Issue #1: Docker Performance on Windows (Native)

---

**Platform**: Windows 10/11 (without WSL2)

## Security Considerations

**Status**: ⚠️ Known limitation

### Not Vulnerabilities, But Be Aware:

**Description**: Docker Desktop on Windows (Hyper-V mode) is significantly slower than WSL2 or Linux.

#### Default Credentials in Development

**Impact**: - **Issue**: docker-compose.yml has default passwords

- Container startup: 2-3 minutes (vs. 30 seconds on Linux)- **Impact**: Anyone can access development database

- API response: 200-400ms (vs. 80-150ms on Linux)- **Solution**: Change passwords for production

- Database queries: 80-150ms (vs. 20-50ms on Linux)- **Status**: ✅ Documented in setup guide



**Workaround**: **Use WSL2 mode in Docker Desktop** (Settings > General > "Use WSL 2 based engine").---



**Fix**: No fix needed - this is a Docker Desktop limitation. WSL2 is recommended.#### DEBUG=True in Development

- **Issue**: Detailed error pages expose internal info

---- **Impact**: Information disclosure

- **Solution**: Never deploy with DEBUG=True

#### Issue #2: Line Ending Conflicts (Git on Windows)- **Status**: ✅ Documented



**Platform**: Windows 10/11---



**Status**: ⚠️ Configuration issue#### CORS Set to Allow All Origins (Development)

- **Issue**: Any website can make API requests

**Description**: Git may convert LF to CRLF, breaking shell scripts in Docker containers.- **Impact**: CSRF potential (mitigated by JWT)

- **Solution**: Restrict CORS in production

**Symptoms**: Error when running `docker-compose up`: `bash: syntax error near unexpected token '$'`.- **Status**: ✅ Documented



**Workaround**: Configure Git to preserve LF line endings:---

```bash

git config --global core.autocrlf input## Disclaimer

git clone https://github.com/KazimFedxD/FinCore.git

```FinCore is in **early development (alpha)**. While we strive for stability:



**Fix**: Included `.gitattributes` file in v0.2.0 to enforce LF.- ⚠️ **Data loss is possible** - Use for testing only

- ⚠️ **Breaking changes may occur** between versions

---- ⚠️ **No warranty or guarantee** of functionality

- ⚠️ **Not production-ready** until v1.0.0

### macOS Issues- ⚠️ **Backup your data** regularly



#### Issue #3: PostgreSQL Connection Timeout on Apple Silicon (M1/M2)For production use, wait for stable release (v1.0.0, estimated Q4 2026).



**Platform**: macOS 13+ with Apple Silicon---



**Status**: 🐛 Intermittent## Getting Help



**Description**: Occasionally, PostgreSQL container fails to start on first `docker-compose up`, showing "Connection timeout".- **Documentation**: Check `.website/` folder

- **GitHub Issues**: Report bugs and request features

**Symptoms**:- **Email**: [Contact project maintainer]

```- **Community**: [Discord/Slack - if available]

backend_1  | django.db.utils.OperationalError: could not connect to server: Connection refused
```

**Workaround**: 
1. Stop containers: `docker-compose down`
2. Remove volumes: `docker-compose down -v`
3. Rebuild with platform flag: `docker-compose build --platform linux/amd64 db`
4. Restart: `docker-compose up -d`

**Planned Fix**: v0.2.0 - Use native ARM64 PostgreSQL image (faster and more reliable on Apple Silicon).

---

### Linux Issues

#### Issue #4: Permission Errors with Docker Volumes

**Platform**: Ubuntu 20.04+, Debian 11+

**Status**: ⚠️ Configuration issue

**Description**: Docker volumes may have incorrect permissions, preventing database writes.

**Symptoms**:
```
db_1  | FATAL:  could not open file "pg_hba.conf": Permission denied
```

**Workaround**: Fix permissions:
```bash
sudo chown -R $USER:$USER .
docker-compose down -v
docker-compose up -d
```

**Permanent Fix**: Add user to `docker` group:
```bash
sudo usermod -aG docker $USER
newgrp docker  # Apply group changes without logout
```

---

## Browser Compatibility Issues

### Safari-Specific

#### Issue #5: Date Input Styling Inconsistent

**Browser**: Safari 14-16 (macOS/iOS)

**Status**: ⚠️ Browser limitation

**Description**: Safari renders `<input type="date">` with native styling that doesn't match Tailwind CSS.

**Impact**: Visual inconsistency (functional, but looks different).

**Workaround**: Accept browser default styling, or use custom date picker (planned v0.2.0).

---

#### Issue #6: LocalStorage Quota Exceeded on Safari (Private Mode)

**Browser**: Safari (iOS/macOS) in Private Browsing mode

**Status**: ⚠️ Safari limitation

**Description**: Safari limits LocalStorage to 0 bytes in Private Browsing, breaking auth state persistence.

**Symptoms**: User logged out on every page refresh.

**Workaround**: Use Safari in normal mode (not Private Browsing).

**Fix**: v0.3.0 - Add fallback to sessionStorage or in-memory storage when LocalStorage is unavailable.

---

### Firefox-Specific

#### Issue #7: WebSocket Reconnection Delay on Network Changes

**Browser**: Firefox 88-120

**Status**: 🐛 Known bug (not in FinCore, but affects future features)

**Description**: When network connection changes (e.g., Wi-Fi to mobile), WebSockets take 3-5 seconds to reconnect.

**Impact**: Future real-time features (planned v0.5.0) may have reconnection delay.

**Workaround**: Refresh page to force immediate reconnection.

**Fix**: Will be addressed when WebSocket support is added (v0.5.0).

---

## Performance Bottlenecks

### Backend Bottlenecks

#### Bottleneck #1: Report Endpoint Aggregates All Data

**Endpoint**: `GET /api/report/`

**Status**: ⚠️ Needs optimization

**Description**: Report calculates totals by querying all income and expenses without pagination.

**Impact**: Slow response times (118ms avg, 450ms P99) for users with 1,000+ transactions.

**Current Query**:
```python
total_income = Income.objects.filter(user=request.user).aggregate(Sum('amount'))
total_expenses = Expense.objects.filter(user=request.user).aggregate(Sum('amount'))
```

**Planned Fix** (v0.2.0): Add Redis caching with 5-minute TTL:
```python
cache_key = f'report_{request.user.id}'
cached = cache.get(cache_key)
if cached:
    return Response(cached)
# ... compute report
cache.set(cache_key, data, 300)
```

**Expected Impact**: 95% reduction in response time (118ms → 5ms on cache hit).

---

#### Bottleneck #2: Category Hierarchy Recursive Queries

**Description**: Fetching category tree requires multiple queries (N+1 problem).

**Impact**: Slow category list (35ms avg, could be <10ms).

**Current**: Not using `select_related` or `prefetch_related`.

**Planned Fix** (v0.2.0): Use `select_related('parent')` to fetch in single query.

**Expected Impact**: 70% reduction in query time (35ms → 10ms).

---

### Frontend Bottlenecks

#### Bottleneck #3: Dashboard Fetches All Data on Every Load

**Description**: Dashboard makes 4 separate API calls on load (categories, incomes, expenses, report).

**Impact**: Slow initial load (2.1s TTI).

**Planned Fix** (v0.3.0): Implement GraphQL or combine into single `/api/dashboard/` endpoint.

**Expected Impact**: 40% reduction in load time (2.1s → 1.3s).

---

## Security Considerations

### Security Limitation #1: No Rate Limiting

**Status**: ❌ Not implemented

**Description**: API endpoints have no rate limiting. Vulnerable to brute-force attacks.

**Impact**: Attackers can attempt unlimited login attempts or spam API requests.

**Workaround**: Use firewall rules or reverse proxy (Nginx) rate limiting:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://backend:8000;
}
```

**Planned Fix**: v0.3.0 - Django rate limiting with `django-ratelimit`.

---

### Security Limitation #2: No Two-Factor Authentication (2FA)

**Status**: ❌ Not implemented

**Description**: Password-only authentication. No 2FA/MFA option.

**Impact**: Accounts vulnerable if password is compromised.

**Workaround**: Use strong, unique passwords + password manager.

**Planned Fix**: v0.4.0 - TOTP-based 2FA with QR code setup.

---

### Security Limitation #3: Debug Mode Enabled by Default

**Status**: ⚠️ Configuration issue

**Description**: `.env.example` has `DEBUG=True` by default.

**Impact**: If deployed without changing, exposes sensitive error information.

**Workaround**: **Always set `DEBUG=False` in production** `.env` file.

**Planned Fix**: v0.2.0 - Add environment detection (auto-disable debug in production).

---

## Workarounds

### General Workarounds

**Issue**: Docker containers slow to start
**Workaround**: Use SSD instead of HDD, or increase Docker RAM allocation (Docker Desktop > Settings > Resources).

**Issue**: Email verification not received
**Workaround**: Check spam folder. If using Gmail, ensure "Less secure app access" is disabled and use App Password instead.

**Issue**: JWT token expired errors
**Workaround**: Clear browser LocalStorage and log in again:
```javascript
// Run in browser console
localStorage.clear();
location.reload();
```

**Issue**: Database locked or corrupted
**Workaround**: Reset database:
```bash
docker-compose down -v
docker-compose up -d
docker-compose exec backend python manage.py migrate
```

---

## Reporting New Issues

If you encounter a bug not listed here:

1. **Search existing issues**: https://github.com/KazimFedxD/FinCore/issues
2. **Gather information**:
   - FinCore version (check `metadata.json`)
   - Operating system and version
   - Browser and version
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots (if applicable)
3. **Open new issue**: https://github.com/KazimFedxD/FinCore/issues/new
4. **Label appropriately**: `bug`, `enhancement`, `platform-specific`, etc.

**Security vulnerabilities**: Please report privately to the maintainer instead of opening public issues.

---

## Changelog

**v0.1.0-alpha** (November 2025):
- Initial release
- Known bugs documented above
- Limitations clearly stated

**Planned for v0.2.0** (Q1 2026):
- Fix bugs #1, #2, #4, #5, #6, #8
- Address bottlenecks #1, #2
- Implement date filtering (limitation #6)

**Planned for v0.3.0** (Q2 2026):
- Fix bug #3 (JWT rotation)
- Address security limitations #1, #3
- Implement data export (limitation #3)

---

**Questions or need help?** Check `setup.md` for troubleshooting or open an issue on GitHub.
