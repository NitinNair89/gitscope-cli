# Gitscope CLI

Gitscope is a lightweight CLI tool that summarizes the key features and changes in a Git repository using structured commit history analysis. It helps developers, teams, and stakeholders quickly understand what’s been built—without reading every commit manually.

---

## 🚀 Features (Sprint-1 Scope)

- Parse Git commit history from local or remote repositories
- Group changes by feature, fix, chore, and refactor
- Generate summary in markdown or plain text format
- Auto-detect conventional commit formats
- CLI-friendly output with optional file export

| Milestone                        | Status         |
| -------------------------------- | -------------- |
| Sprint-1: Setup + Parser         | ⏳ In Progress |
| Sprint-2: Formatters + Export    | 🔒 Locked      |
| Sprint-3: GitHub API Integration | 🔒 Locked      |

---

## 🎯 Use Cases

- ✅ Auto-generate changelogs for project documentation
- ✅ Share concise feature summaries with clients/stakeholders
- ✅ Integrate into GitHub Actions or CI/CD pipelines
- ✅ Power dashboards or weekly progress digests

---

## 🛠️ Tech Stack

- TypeScript + Node.js
- Commander.js (CLI framework)
- Git CLI (accessed via child process)

---

## 📦 Install (manual)

```bash
git clone https://github.com/NitinNair89/gitscope-cli.git
cd gitscope-cli
npm install
npm run build
```

---

## 🏃 Usage

```bash
gitscope summary --limit 10
```
