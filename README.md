# Gitscope CLI

![GitHub release (latest by date)](https://img.shields.io/github/v/release/NitinNair89/gitscope-cli)

**Gitscope** is a lightweight and developer-friendly CLI tool that summarizes key changes in a Git repository by analyzing structured commit history. It helps developers, teams, and stakeholders **instantly understand what’s been built**, without digging through raw logs.

Supports export in **HTML**, **JSON**, and **Markdown** formats for easy integration into documentation, dashboards, or client reports.

---

## 🚀 Features

- 🔍 Parse and summarize Git commit history from any local repo
- 🧠 Auto-detect conventional commit types (`feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `ci`, `build`)
- 📊 Group commits by category and generate clean summaries
- 📁 Export reports in `HTML`, `JSON`, or `Markdown`
- 💻 Designed for fast, CLI-native use

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

## 📦 Installation (Manual)

```bash
git clone https://github.com/NitinNair89/gitscope-cli.git
cd gitscope-cli
npm install
npm run dev
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

## 📌 Roadmap

- ✅ JSON summary export with metadata (Sprint 1)
- 📝 Markdown summary export (Sprint 2)
- 📄 HTML summary export (Sprint 2)
- 🧠 Smart summary generator (WIP)
- 📊 Recruiter view + CLI analytics summary (Sprint 3)
- 🔐 CLI authentication with GitHub (Sprint 4)
- 🧰 Plugin system for custom formatting/output (Sprint 5)
- 🌐 SaaS companion web app (standalone, post-v2.0)

---

## 👨‍💻 Author

Built with ❤️ by Nitin Nair

Software Engineer • React | Node | TypeScript
