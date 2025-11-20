# Configuration Samples

This folder contains sanitized configuration files from the Full-Stack Template project.

**⚠️ Important**: All sensitive information has been replaced with placeholders. These files serve as reference for your portfolio documentation.

## Files Included

### Environment Variables

- **`.env.backend.example`** - Backend environment variables (Django, PostgreSQL, Email, Celery)
- **`.env.frontend.example`** - Frontend environment variables (React)

### Dependency Files

- **`requirements.txt`** - Python dependencies for Django backend
- **`package.json`** - Node.js dependencies for React frontend

### Configuration Files

- **`nginx.conf`** - Nginx reverse proxy configuration
- **`tailwind.config.js`** - Tailwind CSS configuration

### Docker Configuration

*Note: `docker-compose.yml` not included as it's already in main README. See project repository for full Docker configuration.*

---

## Sanitization Applied

All configuration files have been sanitized to remove:

- ✅ Real email addresses → `your-email@gmail.com`
- ✅ Passwords → `your-password-here`
- ✅ API keys → `YOUR_API_KEY_HERE`
- ✅ Secret keys → `your-secret-key-change-in-production`
- ✅ Production URLs → Generic examples
- ✅ Database credentials → Placeholder values

---

## Using These Files

### For Your Portfolio

These files demonstrate:
- **Technology choices** (Python packages, npm dependencies)
- **Configuration patterns** (environment variables, build tools)
- **Architecture decisions** (Nginx routing, Tailwind setup)
- **Best practices** (environment-based configuration)

### For New Projects

To use this template:
1. Clone the repository
2. Create `.env` files based on `.env.example` files
3. Replace all placeholders with actual values
4. Install dependencies: `pip install -r requirements.txt`, `npm install`
5. Run with Docker: `docker-compose up -d`

---

## Security Notes

🔒 **Never commit real credentials to version control!**

- Use `.env` files (gitignored by default)
- Use `.env.example` with placeholders for documentation
- Store production secrets in secure secret management systems (AWS Secrets Manager, Azure Key Vault, etc.)
- Rotate keys and passwords regularly

---

## Additional Configuration

For complete setup instructions, see:
- `../setup.md` - Installation and configuration guide
- `../environment-variables.md` - Detailed environment variable reference
- `../README.md` - Main project documentation

---

**Last Updated**: November 2025  
**Version**: 1.0.0
