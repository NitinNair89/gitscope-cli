# Gitscope CLI

Gitscope is a lightweight CLI tool that summarizes the key features and changes in a Git repository using structured commit history analysis. It helps developers, teams, and stakeholders quickly understand what’s been built—without reading every commit manually. Supports HTML, JSON and Markdown output formats.

---

## Features

- Parse Git commit history from local repository
- Group changes by feature, fix, chore, and refactor
- Generate summary in HTML, JSON or Markdown format
- Auto-detect conventional commit formats
- CLI-friendly output

---

## Use Cases

- ✅ Auto-generate changelogs for project documentation
- ✅ Share concise feature summaries with clients/stakeholders
- ✅ Power dashboards or weekly progress digests

---

## Tech Stack

- TypeScript + Node.js
- Commander.js (CLI framework)
- Git CLI (accessed via child process)

---

## Install (manual)

```bash
git clone https://github.com/NitinNair89/gitscope-cli.git
cd gitscope-cli
npm install
npm run dev
```

---

## Usage

You can use the default mode which summarizes the recent 10 commits in JSON format.

```bash
gitscope
```

To specify the number of commits, use the `-l` or `--limit` flag. The default limit is `10`.

```bash
gitscope -l 5
```

To generate reports in a specific format, use the `-o` or `--output` flag. The default format is "json".

```bash
gitscope -l 5 -o "json" // generates JSON report
 gitscope -l 5 -o "html" // generates HTML report
 gitscope -l 5 -o "markdown" // generates Markdown report
```
