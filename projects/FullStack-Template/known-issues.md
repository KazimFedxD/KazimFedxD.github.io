# Known Issues & Limitations

## Current Limitations

### 1. Email Verification Token Storage

**Issue**: Verification tokens are stored in-memory rather than in the database.

**Impact**:
- Tokens are lost if the backend container restarts
- Cannot scale across multiple backend instances
- Users mid-verification will need to request a new token after restart

**Workaround**:
- Keep backend container running
- Request new verification email if token expired

**Status**: ⚠️ Known limitation  
**Planned Fix**: v2.0 - Move to database-backed token storage  
**Priority**: Medium

---

### 2. No Mobile Application

**Issue**: Currently web-only, no native mobile apps (iOS/Android).

**Impact**:
- Mobile users must use browser (responsive design works well)
- No push notifications
- No offline functionality
- No app store presence

**Workaround**:
- Use mobile browser with "Add to Home Screen"
- Progressive Web App (PWA) can be added in future

**Status**: ℹ️ Planned feature  
**Timeline**: iOS and Android apps planned for v2.0 (Q2 2026)  
**Priority**: Low

---

### 3. File Upload Size Limit

**Issue**: No file upload functionality currently implemented.

**Impact**:
- Cannot upload user avatars or profile pictures
- No document/attachment support

**Workaround**:
- Use external services (Gravatar for avatars)
- Implement custom file upload when needed

**Status**: ℹ️ Feature not implemented (template project)  
**How to Add**: Integrate with Django's file handling or cloud storage (AWS S3)  
**Priority**: Low (depends on use case)

---

### 4. Rate Limiting Not Configured

**Issue**: No API rate limiting implemented.

**Impact**:
- Vulnerable to brute force attacks on login
- No protection against spam registrations
- Potential for DoS attacks

**Workaround**:
- Add rate limiting manually using Django packages
- Use Nginx rate limiting as temporary solution

**Status**: ⚠️ Security consideration  
**Recommended Fix**:
```python
# Install: pip install django-ratelimit
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m')
def login(request):
    # Login logic
```

**Priority**: High for production

---

### 5. No Real-Time Features (WebSockets)

**Issue**: No WebSocket support for real-time communication.

**Impact**:
- No live chat
- No real-time notifications
- No collaborative features
- Page refresh needed for updates

**Workaround**:
- Use polling for pseudo-real-time updates
- Implement WebSockets when needed using Django Channels

**Status**: ℹ️ Not implemented (not needed for all use cases)  
**How to Add**: Install Django Channels and Redis Channel Layer  
**Priority**: Low (depends on requirements)

---

### 6. SQLite Not Recommended for Production

**Issue**: Default fallback database is SQLite if PostgreSQL not configured.

**Impact**:
- No concurrent write support
- File-based storage (slower than PostgreSQL)
- Limited scalability

**Workaround**:
- Always use PostgreSQL (included in Docker setup)

**Status**: ✅ Not an issue when using Docker Compose (PostgreSQL by default)  
**Priority**: N/A

---

## Platform-Specific Issues

### Windows

#### Issue: Slow Docker Performance

**Symptoms**: 
- Slow startup times (2-3x slower than Linux)
- Hot-reload delays
- High CPU usage

**Cause**: WSL2 file system translation overhead

**Solutions**:
1. **Use WSL2 backend** (not Hyper-V)
   - Docker Desktop → Settings → General → Use WSL2 backend
2. **Clone repo inside WSL2 filesystem**
   ```bash
   # Inside WSL2 terminal
   cd ~
   git clone https://github.com/yourusername/FullStack-Template.git
   ```
3. **Allocate more resources**
   - Docker Desktop → Settings → Resources
   - Increase CPU and RAM allocation

**Status**: ⚠️ Known Windows/Docker limitation  
**Priority**: N/A (platform limitation)

---

#### Issue: Line Ending Conversion (CRLF vs LF)

**Symptoms**:
- Bash scripts fail in containers
- Git shows all files as modified

**Cause**: Windows uses CRLF, Linux uses LF

**Solution**:
```bash
# Configure Git to use LF
git config --global core.autocrlf input

# Convert existing files
git rm --cached -r .
git reset --hard
```

**Status**: ✅ Solved with Git configuration  
**Priority**: Low

---

### macOS

#### Issue: File Watching Delays

**Symptoms**: Hot-reload slower than expected (5-10 seconds)

**Cause**: Docker for Mac file sync overhead

**Solution**:
- Already using `CHOKIDAR_USEPOLLING=true` for frontend
- Consider using `docker-sync` for better performance
- Or develop outside Docker on macOS

**Status**: ⚠️ Known Docker for Mac limitation  
**Priority**: Low

---

#### Issue: Port Already in Use (especially 5000)

**Symptoms**: Cannot start services, "port already allocated" error

**Cause**: macOS Monterey+ uses port 5000 for AirPlay

**Solution**:
```bash
# Disable AirPlay Receiver
# System Preferences → Sharing → Uncheck "AirPlay Receiver"

# Or change port in docker-compose.yml
ports:
  - "5001:5000"  # Use different host port
```

**Status**: ✅ Solved with port change  
**Priority**: Low

---

### Linux

#### Issue: Permission Denied on Docker Socket

**Symptoms**: `docker` commands require `sudo`

**Cause**: User not in `docker` group

**Solution**:
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in for changes to take effect
# Or run: newgrp docker
```

**Status**: ✅ Solved with user group configuration  
**Priority**: Low

---

## Browser Compatibility Issues

### Safari < 15

#### Issue: Date Input Styling Inconsistent

**Symptoms**: Date picker appears unstyled or with wrong format

**Cause**: Safari's non-standard date input rendering

**Workaround**:
- Use text input with date validation
- Or use third-party date picker library

**Status**: ⚠️ Known Safari limitation  
**Affected Users**: iOS Safari < 15  
**Priority**: Low (small user base)

---

### Firefox

#### Issue: WebSocket Reconnection Delay

**Symptoms**: 3-5 second delay on network changes (when WebSockets implemented)

**Cause**: Firefox's aggressive connection cleanup

**Workaround**:
- Refresh page to force reconnect
- Implement heartbeat/ping mechanism

**Status**: ℹ️ Not applicable yet (no WebSockets)  
**Priority**: Low

---

### Internet Explorer

#### Issue: Not Supported

**Symptoms**: Application does not load or displays errors

**Cause**: IE lacks ES6+ JavaScript support

**Solution**: None - IE is not supported

**Status**: ❌ Will not fix  
**Priority**: N/A

---

## API & Backend Issues

### Issue: CORS Errors in Production

**Symptoms**: 
- API calls fail with CORS policy errors
- "Access-Control-Allow-Origin" missing

**Cause**: CORS not configured for production domain

**Solution**:
```python
# backend/backend/settings.py
CORS_ALLOW_ALL_ORIGINS = False  # Change from True
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]
```

**Status**: ⚠️ Requires production configuration  
**Priority**: High (for production deployment)

---

### Issue: JWT Token Expires Too Quickly

**Symptoms**: Users logged out after 5 minutes

**Cause**: Short access token lifetime (5 minutes)

**Solution**:
```python
# backend/backend/settings.py
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),  # Increase to 30 min
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}
```

**Status**: ⚠️ Configuration trade-off (security vs UX)  
**Priority**: Medium

---

### Issue: Email Sending Fails with Gmail

**Symptoms**: 
- "Authentication failed" error
- Emails not delivered

**Cause**: Using regular password instead of App Password

**Solution**:
1. Enable 2-Factor Authentication on Google account
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use 16-character app password in `.env`

**Status**: ✅ Solved with App Password  
**Priority**: N/A (documentation issue)

---

## Database Issues

### Issue: Database Connection Lost After Idle

**Symptoms**: API errors after periods of inactivity

**Cause**: PostgreSQL closes idle connections

**Solution**:
```python
# backend/backend/settings.py
DATABASES = {
    'default': {
        'CONN_MAX_AGE': 600,  # Keep connections for 10 minutes
    }
}
```

**Status**: ⚠️ Configuration needed for production  
**Priority**: Medium

---

### Issue: Migration Conflicts

**Symptoms**: 
- Migration errors on deployment
- "Conflicting migration" messages

**Cause**: Parallel development without coordination

**Solution**:
```bash
# Merge migrations
python manage.py makemigrations --merge

# Or reset migrations (CAUTION: development only)
python manage.py migrate --fake
```

**Status**: ℹ️ Normal Django development issue  
**Priority**: Low

---

## Performance Bottlenecks

### Issue: Slow Registration Due to Password Hashing

**Symptoms**: Registration endpoint takes 150-200ms

**Cause**: PBKDF2 hashing is CPU-intensive (secure, but slow)

**Impact**: Acceptable for production (security over speed)

**Workaround**: None - this is expected behavior for secure password storage

**Status**: ✅ Not a bug, security feature  
**Priority**: N/A

---

### Issue: Large node_modules Size (600+ MB)

**Symptoms**: Slow Docker builds, large image size

**Cause**: Frontend dependencies include dev tools

**Solution**: Use multi-stage Docker builds (already implemented)

**Status**: ✅ Mitigated with Docker best practices  
**Priority**: Low

---

## Security Considerations

### Issue: Debug Mode Default

**Symptoms**: `DEBUG=True` in default settings.py

**Cause**: Developer convenience

**Impact**: ⚠️ **CRITICAL** if deployed to production without changing

**Solution**:
```env
# backend/.env (production)
DEBUG=False
```

**Status**: ⚠️ **MUST** be configured before production  
**Priority**: **CRITICAL**

---

### Issue: Default SECRET_KEY in Code

**Symptoms**: Hardcoded SECRET_KEY in settings.py

**Cause**: Fallback for quick start

**Impact**: ⚠️ Insecure if not overridden

**Solution**:
```env
# backend/.env
SECRET_KEY=your-randomly-generated-secret-key-here
```

**Status**: ⚠️ **MUST** be changed in production  
**Priority**: **CRITICAL**

---

## Deployment Issues

### Issue: Static Files Not Served in Production

**Symptoms**: CSS/JS missing, unstyled pages

**Cause**: DEBUG=False disables Django's static file serving

**Solution**:
```bash
# Collect static files
python manage.py collectstatic

# Configure Nginx to serve /static/ and /media/
```

**Status**: ℹ️ Expected Django behavior  
**Priority**: High (for production)

---

### Issue: Docker Build Fails on ARM Macs (M1/M2)

**Symptoms**: "no matching manifest for linux/arm64" errors

**Cause**: Some images don't support ARM architecture

**Solution**:
```yaml
# docker-compose.yml
platform: linux/amd64  # Force AMD64 architecture
```

**Note**: May have slight performance impact

**Status**: ✅ Solved with platform specification  
**Priority**: Low

---

## Testing Gaps

### Issue: No Automated Tests

**Symptoms**: No unit tests, integration tests, or E2E tests

**Impact**: 
- Regressions may go unnoticed
- Refactoring is risky

**Workaround**: Add tests manually as needed

**Status**: ℹ️ Template project - tests not included  
**How to Add**:
```python
# backend/usermanagement/tests.py
from django.test import TestCase

class AuthTestCase(TestCase):
    def test_registration(self):
        # Test logic
        pass
```

**Priority**: Medium (for production use)

---

## Future Improvements

Issues that will be addressed in upcoming versions:

### v2.0 (Planned Q2 2026)

- [ ] Database-backed verification tokens
- [ ] Built-in rate limiting
- [ ] File upload support
- [ ] Admin dashboard improvements
- [ ] WebSocket support (Django Channels)
- [ ] Comprehensive test suite
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Mobile app (React Native)

### v2.1 (Planned Q3 2026)

- [ ] Multi-language support (i18n)
- [ ] Dark mode
- [ ] Advanced user permissions
- [ ] Two-factor authentication (2FA)
- [ ] Social auth (Google, GitHub, etc.)
- [ ] Password strength meter
- [ ] Email template editor

---

## Reporting Issues

If you encounter a bug not listed here:

1. **Check existing issues**: [GitHub Issues](https://github.com/KazimFedxD/FullStack-Template/issues)
2. **Search documentation**: README.md, this file, setup.md
3. **Create new issue** with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Docker version, etc.)
   - Relevant logs

**Template for bug reports**:
```markdown
### Description
[Clear description of the issue]

### Steps to Reproduce
1. Step 1
2. Step 2
3. ...

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- OS: [e.g., Ubuntu 22.04]
- Docker: [e.g., 24.0.5]
- Browser: [e.g., Chrome 120]

### Logs
[Paste relevant error logs]
```

---

## Workaround Summary

Quick reference for common issues:

| Issue | Quick Fix |
|-------|-----------|
| Slow Windows Docker | Use WSL2, clone inside WSL filesystem |
| CORS errors | Update CORS_ALLOWED_ORIGINS in settings.py |
| Email not sending | Use Gmail App Password, not regular password |
| Port already in use | Change port in docker-compose.yml or stop conflicting service |
| Hot-reload not working | Set CHOKIDAR_USEPOLLING=true, restart containers |
| Token expires too fast | Increase ACCESS_TOKEN_LIFETIME in settings.py |
| Database connection issues | Check DATABASE_URL, ensure PostgreSQL is running |
| Frontend can't reach API | Verify REACT_APP_API_URL matches backend URL |

---

**Last Updated**: November 2025  
**Version**: 1.0.0
