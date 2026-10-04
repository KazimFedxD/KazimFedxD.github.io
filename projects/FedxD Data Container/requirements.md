# System Requirements

## Operating Systems

### Officially Supported
- ✅ **Linux** (Ubuntu 20.04+, Debian 11+, Fedora 35+, Arch Linux)
- ✅ **macOS** (macOS 12 Monterey and later)
- ✅ **Windows** (Windows 10/11, Windows Server 2019+)

### Compatibility Notes
- **Linux**: Works on any distribution with Python 3.10+
- **macOS**: Both Intel and Apple Silicon (M1/M2/M3) supported
- **Windows**: Works on both x86_64 and ARM64 (Windows on ARM)
- **BSD**: Should work on FreeBSD, OpenBSD (untested)
- **WSL**: Fully compatible with Windows Subsystem for Linux

## Hardware Requirements

### Minimum Requirements
- **CPU**: Any modern processor (x86_64, ARM64, or equivalent)
- **RAM**: 100 MB available memory
- **Disk Space**: 5 MB for library installation
- **Architecture**: 32-bit or 64-bit

### Recommended Requirements
- **CPU**: Dual-core processor or better
- **RAM**: 512 MB available memory (for large file parsing)
- **Disk Space**: 50 MB (including dependencies and cache)
- **Architecture**: 64-bit

### Performance Considerations
- **Large Files (> 10 MB)**: 2 GB RAM recommended
- **Deep Nesting (> 100 levels)**: Increase stack size
- **Type Checking**: No additional hardware requirements
- **Concurrent Usage**: Multi-core CPU beneficial for parallel parsing

## Software Dependencies

### Required

#### Python 3.10+
- **Minimum Version**: Python 3.10.0
- **Recommended Version**: Python 3.11 or 3.12
- **Why 3.10+**: 
  - Uses modern type hint syntax (`X | Y` union types)
  - TypeAlias support
  - Improved Generic type handling
  - Pattern matching (if used in future)

**Installation:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3.10 python3-pip

# macOS (Homebrew)
brew install python@3.10

# Windows
# Download from python.org
```

#### pip (Python Package Manager)
- **Version**: 21.0+
- **Purpose**: Package installation and dependency management

**Verification:**
```bash
python3 --version  # Should be 3.10 or higher
pip3 --version     # Should be 21.0 or higher
```

### Optional Dependencies

#### NumPy 2.0.2+
- **Purpose**: Serialization support for NumPy arrays and matrices
- **Size**: ~20 MB
- **When Needed**: If you use `numpy.ndarray`, `numpy.matrix`, or NumPy types

**Installation:**
```bash
pip install numpy>=2.0.2
```

**Supported Types:**
- `numpy.ndarray` (NDArray)
- `numpy.matrix` (Matrix)

#### Pandas 2.3.1+
- **Purpose**: Serialization support for Pandas DataFrames
- **Size**: ~40 MB (includes NumPy)
- **When Needed**: If you use `pandas.DataFrame` or Pandas types

**Installation:**
```bash
pip install pandas>=2.3.1
```

**Supported Types:**
- `pandas.DataFrame`

#### pytest 8.4.1+
- **Purpose**: Running test suite
- **Size**: ~5 MB
- **When Needed**: For development or testing

**Installation:**
```bash
pip install pytest>=8.4.1
```

### Development Dependencies

For contributing or development:

```bash
# Install all development dependencies
pip install pytest>=8.4.1 numpy>=2.0.2 pandas>=2.3.1 build wheel twine
```

**Tools:**
- **pytest**: Testing framework
- **build**: Package building tool
- **wheel**: Binary distribution format
- **twine**: PyPI upload utility
- **pytest-cov** (optional): Code coverage reporting

## Python Environment

### Virtual Environment (Recommended)

Using virtual environments isolates dependencies:

```bash
# Create virtual environment
python3 -m venv fxdc_env

# Activate (Linux/macOS)
source fxdc_env/bin/activate

# Activate (Windows)
fxdc_env\Scripts\activate

# Install FxDC
pip install fxdc

# Deactivate when done
deactivate
```

### Conda Environment (Alternative)

```bash
# Create conda environment
conda create -n fxdc_env python=3.10

# Activate
conda activate fxdc_env

# Install FxDC
pip install fxdc

# Optionally install NumPy/Pandas via conda
conda install numpy pandas
```

### System-Wide Installation (Not Recommended)

```bash
# May require sudo/admin privileges
pip install --user fxdc
```

## Browser Compatibility

Not applicable—FxDC is a Python library, not a web application.

## External Services

### Required Services
- **None**: FxDC is a standalone library with no external dependencies or API calls

### Optional Services
- **PyPI** (pypi.org): For installing via `pip install fxdc`
- **GitHub** (github.com): For source code access and issue tracking

## Network Requirements

### Installation
- **Internet Connection**: Required for `pip install fxdc` (downloads from PyPI)
- **Bandwidth**: ~1 MB download (library only), ~50 MB with NumPy/Pandas
- **Firewall**: Must allow HTTPS (port 443) to pypi.org

### Runtime
- **Internet Connection**: Not required—all operations are local
- **Network Access**: None required for core functionality

## Platform-Specific Notes

### Linux
- **Default Python**: May need to use `python3` instead of `python`
- **Permission**: May need `--user` flag for pip install without sudo
- **Distro Packages**: Prefer pip over distro packages for latest version

### macOS
- **System Python**: Don't use system Python (use Homebrew or python.org)
- **M1/M2/M3**: Fully compatible with Apple Silicon
- **Rosetta**: Not needed—native ARM64 support

### Windows
- **PATH**: Ensure Python is added to PATH during installation
- **Scripts Directory**: May need to add `Scripts` folder to PATH
- **Line Endings**: FxDC handles both `\n` and `\r\n` automatically
- **File Paths**: Use raw strings or forward slashes: `r"C:\data.fxdc"` or `"C:/data.fxdc"`

## Container/Cloud Environments

### Docker

**Dockerfile Example:**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

RUN pip install fxdc

COPY . /app

CMD ["python", "app.py"]
```

**With Optional Dependencies:**
```dockerfile
FROM python:3.10-slim

RUN pip install fxdc numpy pandas

COPY . /app

CMD ["python", "app.py"]
```

### Cloud Platforms

- **AWS Lambda**: ✅ Compatible (include in deployment package)
- **Google Cloud Functions**: ✅ Compatible (add to requirements.txt)
- **Azure Functions**: ✅ Compatible (add to requirements.txt)
- **Heroku**: ✅ Compatible (add to requirements.txt)
- **Vercel**: ⚠️ Python support limited (use FastAPI/Flask wrapper)

**requirements.txt:**
```
fxdc>=5.0.0
numpy>=2.0.2
pandas>=2.3.1
```

## Version Compatibility

### Python Version Support

| Python Version | FxDC Support | Notes |
|---------------|-------------|-------|
| 3.9 and below | ❌ Not supported | Missing type hint features |
| 3.10 | ✅ Fully supported | Minimum version |
| 3.11 | ✅ Fully supported | Recommended |
| 3.12 | ✅ Fully supported | Latest stable |
| 3.13+ | ⚠️ Likely compatible | Untested |

### Dependency Version Compatibility

**NumPy:**
- **Minimum**: 2.0.2
- **Tested**: 2.0.x, 2.1.x
- **Maximum**: No upper limit (should work with future versions)

**Pandas:**
- **Minimum**: 2.3.1
- **Tested**: 2.3.x
- **Maximum**: No upper limit (should work with future versions)

**pytest:**
- **Minimum**: 8.4.1
- **Tested**: 8.4.x
- **Maximum**: No upper limit

## Storage Requirements

### Installation Size
- **fxdc (library only)**: ~100 KB
- **With NumPy**: ~20 MB
- **With Pandas**: ~40 MB
- **With all dev dependencies**: ~50 MB

### Runtime Storage
- **Cache**: ~1 MB (Python bytecode cache in `__pycache__`)
- **Config Files**: Minimal (< 1 KB per config)
- **Data Files**: Dependent on your data (FxDC files are ~1.2x size of equivalent JSON)

### Temporary Files
- **None**: FxDC doesn't create temporary files during parsing
- **Memory Only**: All parsing happens in memory

## Security Requirements

### Permissions
- **File Read**: Required for `load()` function
- **File Write**: Required for `dump()` function
- **Network**: Not required
- **Execution**: Standard Python execution rights

### Sandboxed Environments
- **Compatible**: Yes—no system calls beyond file I/O
- **PyPy**: Compatible (untested but should work)
- **Jython**: ❌ Not compatible (requires CPython 3.10+)
- **IronPython**: ❌ Not compatible (requires CPython 3.10+)

## Testing Environment

For running the test suite:

```bash
# Install test dependencies
pip install pytest numpy pandas

# Run tests
pytest tests/

# Expected system requirements for testing:
# - 500 MB RAM
# - 100 MB disk space (test files + cache)
# - Internet (if tests download fixtures)
```

## Upgrade Path

### From Earlier Versions

```bash
# Upgrade to latest version
pip install --upgrade fxdc

# Upgrade with dependencies
pip install --upgrade fxdc numpy pandas
```

### Breaking Changes
- **v5.0.0**: Major API changes (check CHANGELOG)
- **v4.x → v5.x**: Configuration export format changed
- **v3.x and below**: Not compatible with v5.x

## Troubleshooting Requirements Issues

### "Python version too old"
```bash
# Check Python version
python3 --version

# Install Python 3.10+
# See platform-specific instructions above
```

### "ModuleNotFoundError: No module named 'fxdc'"
```bash
# Install fxdc
pip install fxdc

# Verify installation
python3 -c "import fxdc; print(fxdc.__version__)"
```

### "ImportError: NumPy not found"
```bash
# Only needed if you use NumPy types
pip install numpy>=2.0.2
```

### "ImportError: Pandas not found"
```bash
# Only needed if you use Pandas types
pip install pandas>=2.3.1
```
