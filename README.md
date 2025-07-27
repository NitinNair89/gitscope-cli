# Gitscope CLI

![GitHub release (latest by date)](https://img.shields.io/github/v/release/NitinNair89/gitscope-cli) ![GitHub Repo stars](https://img.shields.io/github/stars/NitinNair89/gitscope-cli?style=social) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/NitinNair89/gitscope-cli)

A fast, focused CLI tool to extract meaningful GitHub repo insights — built for developers who want to highlight contribution value, project health, and portfolio-readiness in seconds.

> Version: v1.1.1 | Author: [@NitinNair89](https://github.com/NitinNair89)

---

<!-- GitHub SEO -->
<!-- keywords: gitscope, git summary tool, changelog generator, CLI git report, conventional commits, git html report, markdown changelog -->
<!-- description: gitscope-cli is a terminal-native tool that parses and summarizes Git commit history into clean changelogs. Supports export to HTML, JSON, and Markdown. -->

## 🚀 Features

- Summarizes Git commit history from any local repository using a single CLI command
- Auto-detects [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `ci`, `build`
- Groups commits by category with clean markdown-style formatting
- Exports commit summaries to `HTML`, `JSON`, or `Markdown` formats
- Outputs self-contained HTML with inline styling for direct printing or sharing
- Built for speed and terminal-native usage, ideal for daily dev workflows and reporting needs

---

## 📌 Use Cases

- ✅ Auto-generate changelogs for product releases
- ✅ Share concise feature updates with clients or team leads
- ✅ Generate commit-based summaries for dashboards, digests, or audits
- ✅ Document code contributions clearly across any project
- ✅ Simplify reporting workflows with zero manual formatting

---

## ⚙️ Tech Stack

- Node.js + TypeScript
- Commander.js (CLI framework)
- Git CLI (via child process interface)

---

## 📦 Installation

```bash
npm i -g gitscope-cli
```

---

## 🧪 Usage

Summarize the most recent commits (default: last 10):

```bash
gitscope
```

Customize the number of commits with --limit or -l:

```bash
gitscope -l 5
```

Generate reports in desired format using --output or -o:

```bash
gitscope -l 5 -o "json"     # JSON output
gitscope -l 5 -o "html"     # HTML output
gitscope -l 5 -o "markdown" # Markdown output
```

---

## 🧪 Testing

```bash
npm test
```

- ✅ Uses built-in test runner to validate core CLI functionality.
- ✅ Ensure all dependencies are installed before running tests.

---

## 👨‍💻 Author

Built with ❤️ by Nitin Nair

Software Engineer • React | Node | TypeScript
