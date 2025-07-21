# 📜 Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)  
Changelog format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

---

## [Unreleased]

### ✨ Added

- JSON export with filename format `gitscope-report-YYYYMMDDHH.json`
- Metadata and commit summary included in exported JSON

---

## [1.0.0] - 2025-07-20

### 🎉 Initial Stable Release

This is the first official release of **Gitscope CLI** — a command-line tool that summarizes Git commit history into human-readable changelogs.

---

### ✨ Features

- Parse Git commit history from any local repository
- 🧠 Auto-detect conventional commit types (`feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`, `ci`, `build`)
- Group and format commits by type
- Output formats supported:
  - 📄 HTML
  - 📦 JSON
  - 📘 Markdown
- CLI-first design for fast, repeatable usage
- Built with **TypeScript + Commander.js**

---

### 📦 Tech Stack

- Node.js
- TypeScript
- Commander.js
- Git CLI (via child process)

---

### 📌 Installation

```bash
git clone https://github.com/NitinNair89/gitscope-cli.git
 cd gitscope-cli
 npm install
 npm run dev
```

---

🔖 Licensed under MIT  
👨‍💻 Built by [Nitin Nair](https://github.com/NitinNair89)
