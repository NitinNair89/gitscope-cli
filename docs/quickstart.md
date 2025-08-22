# Quick Start Guide

This guide will help you get up and running with GitScope CLI in minutes.

## Installation

```bash
npm install -g gitscope-cli
```

## Basic Usage

1. Navigate to your Git repository:
   ```bash
   cd your-repository
   ```

2. Generate a report:
   ```bash
   gitscope
   ```

That's it! You'll find your report in the `exports` directory.

## Common Use Cases

### 1. Release Notes

Generate a Markdown changelog for your latest release:
```bash
gitscope -l 50 -o markdown
```

### 2. Sprint Review

Create an HTML report of commits since last sprint:
```bash
gitscope -l 100 -o html
```

### 3. Code Audit

Export detailed JSON data for analysis:
```bash
gitscope -o json
```

## Tips & Tricks

1. **Branch Analysis**: Use the `-b` flag to analyze specific branches
2. **Custom Limits**: Adjust the `-l` flag based on your needs
3. **Report Location**: All reports are saved in the `exports` directory

## Next Steps

- Check the [main documentation](index.md) for detailed information
- Read our [contributing guidelines](../CONTRIBUTING.md) if you want to help
- Report issues on [GitHub](https://github.com/NitinNair89/gitscope-cli/issues)
