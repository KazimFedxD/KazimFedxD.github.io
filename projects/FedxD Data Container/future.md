# Future Enhancements

## Roadmap

### Version 5.1 (Q1 2026)

#### Comments Support
- [ ] Lexer support for `#` line comments
- [ ] Support for inline comments
- [ ] Preserve comments during round-trip serialization
- [ ] Documentation comment extraction for auto-generated docs

**Why It Matters:**
Currently, FxDC files can't include comments, making them less suitable for human-edited configuration files. Comments would enable better documentation directly in config files.

**Example:**
```fxdc
# Application configuration
app|AppConfig:
    # Server settings
    host|str = "localhost"  # Development host
    port|int = 8080
```

---

#### Multi-Line String Support
- [ ] True multi-line strings (not just `\n` escape sequences)
- [ ] Heredoc-style syntax or triple-quote support
- [ ] Indentation handling for multi-line content

**Why It Matters:**
Complex text values (SQL queries, templates, long descriptions) are difficult to read with escape sequences.

**Example:**
```fxdc
query|str = """
    SELECT * FROM users
    WHERE active = true
    ORDER BY created_at DESC
"""
```

---

#### Performance Improvements
- [ ] Optimize tokenizer for 2x speed improvement
- [ ] Reduce memory footprint during parsing
- [ ] Benchmark suite for regression testing
- [ ] Profile-guided optimization

**Target Metrics:**
- 50% faster parsing for files > 100KB
- 30% lower memory usage

---

### Version 5.2 (Q2 2026)

#### Enhanced Error Messages
- [ ] Better syntax error descriptions with suggestions
- [ ] Show surrounding context for errors
- [ ] "Did you mean?" suggestions for typos
- [ ] Multiple error reporting (collect all errors, not just first)

**Example Error Message:**
```
InvalidData at line 15, column 8:
    age|intger = 30
        ^^^^^^
    Unknown type 'intger'. Did you mean 'int'?
```

---

#### Schema Validation
- [ ] Declarative schema definition files
- [ ] Validate FxDC files against schemas before loading
- [ ] Auto-generate schemas from Python classes
- [ ] JSON Schema compatibility

**Example Schema:**
```fxdc-schema
User:
    required:
        - username: str
        - age: int(min=0, max=150)
    optional:
        - email: str(format=email)
        - bio: str(maxlen=500)
```

---

#### Format Detection
- [ ] Auto-detect whether input is FxDC or JSON
- [ ] Convert between FxDC ↔ JSON ↔ YAML
- [ ] Bidirectional conversion tools
- [ ] Diff tools for FxDC files

**Use Case:**
```python
from fxdc import auto_load

# Automatically detects format
config = auto_load("config.fxdc")   # FxDC
config = auto_load("config.json")   # JSON
config = auto_load("config.yaml")   # YAML
```

---

### Version 6.0 (Q3-Q4 2026)

#### Streaming Parser
- [ ] SAX-style event-driven parsing
- [ ] Support for files > 1 GB
- [ ] Lazy loading for nested structures
- [ ] Iterator-based API

**Why It Matters:**
Current parser loads entire file into memory. Streaming would enable processing massive datasets.

**Example:**
```python
from fxdc import stream_load

# Parse 10 GB file without loading all into memory
for item in stream_load("huge_data.fxdc"):
    process(item)
```

---

#### Plugin System
- [ ] Custom type handlers
- [ ] Syntax extensions via plugins
- [ ] Third-party class auto-discovery
- [ ] Plugin registry and marketplace

**Example:**
```python
from fxdc.plugins import register_type

@register_type("uuid")
def parse_uuid(value):
    return UUID(value)

# Now FxDC can parse:
# id|uuid = "550e8400-e29b-41d4-a716-446655440000"
```

---

#### Advanced Features
- [ ] References and anchors (like YAML anchors)
- [ ] Template variables and interpolation
- [ ] Conditional includes
- [ ] Inheritance for configurations

**Example:**
```fxdc
# Define reusable block
&database_defaults:
    pool_size = 10
    timeout = 30

# Reference it
production|DBConfig:
    <<: *database_defaults
    host = "prod.db.example.com"

development|DBConfig:
    <<: *database_defaults
    host = "localhost"
```

---

### Version 7.0 (2027+)

#### Compiled Extensions
- [ ] Cython/C extension for lexer (10x speedup)
- [ ] Optional compiled parser
- [ ] Binary cache format (.fxdcc)
- [ ] JIT compilation support

**Performance Target:**
- 10x faster tokenization
- 5x faster parsing
- Comparable to Pickle for speed

---

#### IDE Support
- [ ] VS Code extension with syntax highlighting
- [ ] PyCharm plugin
- [ ] Language Server Protocol (LSP) implementation
- [ ] Autocomplete and IntelliSense
- [ ] Real-time validation and linting

**Features:**
- Syntax highlighting for `.fxdc` files
- Autocomplete for registered class names
- Inline type checking
- Go-to-definition for classes
- Refactoring support

---

#### Web Integration
- [ ] JavaScript/TypeScript parser
- [ ] Browser-based FxDC editor
- [ ] REST API for validation/conversion
- [ ] Online playground (try FxDC in browser)

**Use Case:**
Enable FxDC as a config format for full-stack Python/JavaScript apps.

---

## Community Requests

Features requested by users (in priority order):

### High Priority
1. **Comments support** — Most requested feature
2. **Multi-line strings** — Critical for config files
3. **Better error messages** — Improve developer experience
4. **Schema validation** — Enterprise requirement

### Medium Priority
5. **Streaming parser** — For big data use cases
6. **Plugin system** — Extensibility
7. **IDE support** — Developer productivity
8. **Format conversion tools** — Interoperability

### Low Priority
9. **Binary format** — Performance optimization
10. **Web tools** — Nice-to-have

## Long-Term Vision

### Mission
Build the most developer-friendly data serialization format for Python that:
- Reads like Python code
- Validates like a type checker
- Performs like a binary format (with optional compilation)
- Integrates seamlessly with modern Python workflows

### Target Use Cases

**Short Term (1-2 years):**
- Configuration files for Python applications
- Data serialization for small-to-medium datasets
- Plugin systems and dynamic class loading

**Medium Term (3-5 years):**
- Standard config format for Python web frameworks (FastAPI, Django, Flask)
- Data science workflow serialization (Jupyter notebooks, pipelines)
- Cross-language serialization (Python ↔ JavaScript)

**Long Term (5+ years):**
- Replace YAML/JSON in Python ecosystem for human-editable configs
- Native support in Python standard library (via PEP)
- Adoption by major Python projects (Pandas, NumPy, scikit-learn)

### Philosophy

FxDC will always prioritize:
1. **Human Readability** — Config files should be editable without tools
2. **Type Safety** — Catch errors at load time, not runtime
3. **Python-First** — Embrace Python's type system and idioms
4. **Simplicity** — Avoid feature creep; stay focused on core use cases

## Experimental Features

Ideas being explored:

### 1. Async I/O
```python
import asyncio
from fxdc import async_load, async_dump

async def main():
    config = await async_load("config.fxdc")
    await async_dump(config, "output.fxdc")
```

### 2. Encryption Support
```python
from fxdc import load_encrypted, dump_encrypted

config = load_encrypted("config.fxdc", key="secret-key")
dump_encrypted(config, "config.fxdc", key="secret-key")
```

### 3. Compression
```python
from fxdc import load, dump

# Automatic compression for large files
dump(large_data, "data.fxdc.gz", compress=True)
data = load("data.fxdc.gz", decompress=True)
```

### 4. Watch Mode
```python
from fxdc import watch_config

# Auto-reload on file change
for config in watch_config("config.fxdc"):
    print(f"Config updated: {config}")
```

## Breaking Changes Policy

FxDC follows semantic versioning:
- **Patch (5.0.x)**: Bug fixes, no breaking changes
- **Minor (5.x.0)**: New features, backward compatible
- **Major (x.0.0)**: Breaking changes, migration guide provided

**Stability Promise:**
- FxDC 5.x will maintain backward compatibility for all `.fxdc` files
- API changes will be deprecated for at least one minor version before removal
- Migration tools will be provided for major version upgrades

## How to Influence the Roadmap

Your feedback matters! Here's how to help shape FxDC's future:

1. **Vote on Features**: Comment on GitHub issues with 👍
2. **Suggest Ideas**: Open feature request issues
3. **Contribute Code**: Submit PRs for features you want
4. **Share Use Cases**: Tell us how you're using FxDC
5. **Sponsor Development**: Support the project financially (future)

## Contributing to Future Development

Want to help build these features?

**For Comments Support (v5.1):**
- Modify `lexer.py` to skip lines starting with `#`
- Add `TT_COMMENT` token type
- Update parser to ignore comment tokens
- Add tests for comment preservation

**For Multi-Line Strings (v5.1):**
- Add triple-quote detection in lexer
- Track indentation for multi-line content
- Update string token handling in parser
- Add tests for various multi-line scenarios

**For Schema Validation (v5.2):**
- Design schema file format
- Implement schema parser
- Add validation engine
- Create schema generation from classes

See [CONTRIBUTING.md](https://github.com/KazimFedxD/FedxD-Data-Container) for development guidelines.

## Stay Updated

- 📢 **GitHub Discussions**: https://github.com/KazimFedxD/FedxD-Data-Container/discussions
- 🐛 **Issue Tracker**: https://github.com/KazimFedxD/FedxD-Data-Container/issues
- 📦 **PyPI Releases**: https://pypi.org/project/fxdc/
- 📧 **Contact**: fedxdofficial@gmail.com

---

*Roadmap subject to change based on community feedback and priorities.*
