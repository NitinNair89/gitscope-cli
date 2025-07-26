# Gitscope CLI

![GitHub release (latest by date)](https://img.shields.io/github/v/release/NitinNair89/gitscope-cli)

**Gitscope** is a lightweight and developer-friendly CLI tool that summarizes key changes in a Git repository by analyzing structured commit history. It helps developers, teams, and stakeholders **instantly understand what’s been built**, without digging through raw logs.

Supports export in **HTML**, **JSON**, and **Markdown** formats for easy integration into documentation, dashboards, or client reports.

---

## 🚀 Features

- Parse and summarize Git commit history from any local repo
- Auto-detect conventional commit types (`feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `ci`, `build`)
- Group commits by category and generate clean summaries
- Export reports in `HTML`, `JSON`, or `Markdown`
- Inline HTML styling for easy printing
- Designed for fast, CLI-native use

---

## 📌 Use Cases

- ✅ Auto-generate changelogs for product releases
- ✅ Share concise feature updates with clients or team leads
- ✅ Power internal dashboards, progress digests, or project audits

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

🧪 Testing

```bash
npm test
```

---

## 👨‍💻 Author

Built with ❤️ by Nitin Nair

Software Engineer • React | Node | TypeScript
