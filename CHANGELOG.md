# 📜 Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)  
Changelog format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

---

## [1.2.3] - 2025-19-11

### 📈 Improvements

- Fixed vulnerabilities

---

## [1.2.2] - 2025-16-09

### 📈 Improvements

- Improved overall codebase structure
- Enhanced HTML, Markdown and JSON reports to follow a common pattern
- Removed optional defaults for better experience and clarity
- Display `help` options by default when cli is executed without any arguments

---

## [1.2.1] - 2025-08-19

### 📈 Improvements

- Replaced `commander` with `mri` for argument parsing
- Reduced bundle size
- Add `--help` / `-h` flag to show available options

---

## [1.2.0] - 2025-08-16

### ✨ New Features

- Add `--branch` / `-b` flag to generate reports for specific branches
- Ensures commits are specific to the branch provided as argument

---

## [1.1.1] - 2025-07-28

### 📈 Improvements

- Introduced esbuild to bundle CLI into a single output file
- Ensured only minimal, essential files are included in npm tarball

---

## [1.1.0] - 2025-07-26

### ✨ New Features

- Added `markdown`, `html`, and `json` export formats
- Dynamic injection of title and version metadata

### 📈 Improvements

- Styled HTML output with print support

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

🔖 Licensed under MIT  
👨‍💻 Built by [Nitin Nair](https://github.com/NitinNair89)
