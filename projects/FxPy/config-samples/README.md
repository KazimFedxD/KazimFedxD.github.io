# Configuration Samples

These are sanitized configuration files from the FxPy project.
Sensitive information has been replaced with placeholders (none needed for this project).

## Files Included:

### `grammer.txt`
- **Purpose:** Formal grammar specification for FxPy language
- **Description:** BNF-like grammar rules defining the syntax of FxPy
- **Usage:** Reference for understanding language structure and parser implementation
- **No sanitization needed:** Contains only syntax rules, no sensitive data

## About FxPy Configuration

FxPy is a minimal project with **zero external dependencies** and **no configuration files** required.

### No Configuration Files Needed:
- ❌ No `package.json` (not a Node.js project)
- ❌ No `requirements.txt` (no Python dependencies)
- ❌ No `.env` files (no environment variables required)
- ❌ No `docker-compose.yml` (no containerization)
- ❌ No database configuration (no database)
- ❌ No API keys or credentials (no external services)

### What You Need:
- ✅ Python 3.11+ installed
- ✅ Clone the repository
- ✅ Run `python shell.py` or `python run.py <script.fx>`

That's it! FxPy is designed to work out-of-the-box with zero setup.

## Grammar Specification

The `grammer.txt` file defines FxPy's syntax rules:
- Statements structure
- Expression precedence
- Control flow syntax
- Function definitions
- Import statements
- Data structures (lists, dicts)

This file is used as reference during parser development and helps understand how FxPy code is structured.
