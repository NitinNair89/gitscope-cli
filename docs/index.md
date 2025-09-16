# GitScope CLI

![GitHub release (latest by date)](https://img.shields.io/github/v/release/NitinNair89/gitscope-cli) ![GitHub Repo stars](https://img.shields.io/github/stars/NitinNair89/gitscope-cli?style=social) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/NitinNair89/gitscope-cli)

A lightweight CLI tool to generate beautiful summaries of your Git commit history in HTML, JSON, or Markdown format.

**NPM** - [https://www.npmjs.com/package/gitscope-cli](https://www.npmjs.com/package/gitscope-cli)

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

This will generate a JSON report of your last 30 commits.

### Options

- `-l, --limit <number>` - Number of commits to include (default: 30)
- `-o, --output <type>` - Output format: json, markdown, html (default: json)
- `-b, --branch <name>` - Analyze specific branch (default: current branch)
- `-h, --help` - Displays options available to use with this CLI

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

## Sample Reports

View sample reports generated using Gitscope CLI:

- [HTML Report](reports/sample-html-report.html)
- [JSON Report](reports/sample-json-report.json)
- [Markdown Report](reports/sample-markdown-report.md)

These reports showcase different output formats supported by Gitscope CLI:

- The HTML report includes styled tables and commit type indicators
- The JSON report provides structured data for programmatic use
- The Markdown report offers clean, readable changelogs

## Configuration

GitScope automatically detects your repository settings and adapts its output accordingly.

### Output Directory

Reports are saved in the `exports` directory within your repository:

- HTML reports: `exports/gitscope-report-[timestamp].html`
- JSON reports: `exports/gitscope-report-[timestamp].json`
- Markdown reports: `exports/gitscope-report-[timestamp].md`

## Contributing

Contributions are welcome! Please check our [Contributing Guidelines](CONTRIBUTING.md) for details.

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
