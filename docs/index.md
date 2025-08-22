# GitScope CLI

A lightweight CLI tool to generate beautiful summaries of your Git commit history in HTML, JSON, or Markdown format.

## Features

- 📊 Generate formatted commit summaries
- 🎨 Multiple output formats (HTML, JSON, Markdown)
- 🔍 Smart commit type detection
- 📱 Responsive HTML reports
- 🌙 Dark mode support for HTML reports
- 🎯 Branch-specific analysis

## Installation

```bash
npm install -g gitscope-cli
```

## Usage

Basic usage:

```bash
gitscope
```

This will generate a JSON report of your last 10 commits.

### Options

- `-l, --limit <number>` - Number of commits to include (default: 10)
- `-o, --output <type>` - Output format: json, markdown, html (default: json)
- `-b, --branch <name>` - Analyze specific branch (default: current branch)

### Examples

1. Generate HTML report for last 20 commits:

   ```bash
   gitscope -l 20 -o html
   ```

2. Generate Markdown changelog from main branch:

   ```bash
   gitscope -o markdown -b main
   ```

3. Export JSON data for last 5 commits:
   ```bash
   gitscope -l 5 -o json
   ```

## Output Examples

### HTML Report

The HTML report includes:

- Repository metadata
- Commit type statistics
- Detailed commit list
- Dark mode support

[Screenshot placeholder: HTML report example]

### Markdown Report

Markdown reports are perfect for changelogs:

```markdown
# GitScope Report

Generated on August 22, 2025

## Features

- New authentication system
- Improved error handling

## Bug Fixes

- Fixed login redirect issue
- Resolved data loading bug

## Other Changes

- Updated dependencies
- Code cleanup
```

### JSON Output

Structured data for further processing:

```json
{
  "metadata": {
    "repository": "gitscope-cli",
    "version": "1.2.1",
    "generatedAt": "2025-08-22T12:00:00Z"
  },
  "commits": [
    {
      "type": "feat",
      "description": "Add dark mode support",
      "hash": "abc123",
      "author": "John Doe",
      "date": "2025-08-21T10:30:00Z"
    }
  ]
}
```

## Configuration

GitScope automatically detects your repository settings and adapts its output accordingly.

### Output Directory

Reports are saved in the `exports` directory within your repository:

- HTML reports: `exports/gitscope-report-[timestamp].html`
- JSON reports: `exports/gitscope-report-[timestamp].json`
- Markdown reports: `exports/gitscope-report-[timestamp].md`

## Contributing

We welcome contributions! Please check our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/NitinNair89/gitscope-cli.git
   cd gitscope-cli
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

### Running Tests

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
