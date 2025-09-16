import fs from 'fs';
import path from 'path';
import { getCommitType, getExportMetadata } from '../core/meta';
import { ParsedCommitType } from '../types';
import { getOverview } from './overview';
import { getColorByCommitType, getHTMLStyle } from './styles';
import {
  getCommitDate,
  getHTMLSummary,
  getReadableDate,
  getReportDuration,
  getReportTitle,
} from './summary';

/**
 * Exports commit data as a HTML file.
 * If a file with the same name already exists, it will append a counter to the filename
 * to create a new unique filename.
 * The HTML file includes metadata about the repository, version, branch, and the total number of commits and a tabular data of commit history.
 *
 * @param {ParsedCommitType[]} commits Array of commit objects to export as JSON
 * @param {string} limit Number of commits to include in the export
 *
 * @returns {void} This function does not return a value; it writes the JSON content to a file.
 *
 * @example
 * exportHTML(commits, 30);
 */
export function exportHTML(commits: ParsedCommitType[], limit: number): void {
  const { baseName, exportDir } = getExportMetadata();

  const now = new Date();
  const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;

  let filePath = path.join(exportDir, `${baseName}.html`);
  let counter = 1;
  while (fs.existsSync(filePath)) {
    filePath = path.join(exportDir, `${baseName}-${counter++}.html`);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GitScope Report -  ${timestamp}</title>
  ${getHTMLStyle()}
</head>
<body>
  <header>
    <h1>${getReportTitle()}</h1>
    <p>${getReadableDate()}</p>
    <p>${getReportDuration(limit)}</p>
  </header>
  <main role="main">
    <section aria-labelledby="summary">
      <h2 id="summary">Summary</h2>
      ${getHTMLSummary(commits.length, getOverview(commits))}
    </section>
    <section aria-labelledby="commits">
      <h2 id="commits">Commits</h2>
      <table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Date</th>
            <th style="text-align:center;">Type</th>
            <th>Description</th>
            <th>Author</th>
            <th style="text-align:center;">Commit Hash</th>
          </tr>
        </thead>
        <tbody>
           ${getTableRows(commits)}
        </tbody>
      </table>
    </section>
  </main>
</body>
</html>`;

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`HTML export saved to: ${filePath}`);
}

const getTableRows = (commits: ParsedCommitType[]) => {
  const rows = commits
    .map((commit, index) => {
      const hash = commit.hash.slice(0, 6);
      const { type, description } = getCommitType(commit.description);
      const typeColor = getColorByCommitType(type);

      return `
      <tr>
        <td>${index + 1}</td>
        <td>${getCommitDate(commit.date)}</td>
        <td style="text-align:center;"><span class="tag" style="background-color: ${typeColor}">${type}</span></td>
        <td>${description}</td>
        <td>${commit.author}</td>
        <td style="text-align:center;">${hash}</td>
      </tr>                
    `;
    })
    .join('\n');

  return rows;
};
