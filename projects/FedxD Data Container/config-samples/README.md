# Configuration Samples

These are sanitized configuration files from the FedxD Data Container project.
All information is public and safe to share.

## Files Included:

### `pyproject.toml`
- **Purpose**: Python package configuration and build settings
- **Content**: Package metadata, dependencies, build system configuration
- **Usage**: Used by `pip` and `build` tools to install and distribute the package

## Notes

- ✅ All information in these files is public
- ✅ No sensitive credentials or API keys
- ✅ Email address is the public project contact email
- ✅ Safe to include in portfolio documentation

## How These Files Are Used

### pyproject.toml
This file defines:
- Package name and version
- Python version requirements
- Project description and metadata
- Author information (public)
- License (MIT)
- Homepage URL (GitHub repository)
- Development dependencies

It follows PEP 517/518 standards for Python package configuration.

## Installation from Source

If someone wants to install FxDC from source using these configs:

```bash
# Clone repository
git clone https://github.com/KazimFedxD/FedxD-Data-Container.git
cd FedxD-Data-Container

# Install in development mode
pip install -e .

# Or build distribution packages
python -m build
```

## Related Documentation

- See `../setup.md` for detailed installation instructions
- See `../architecture.md` for project structure explanation
- See `../requirements.md` for dependency information
