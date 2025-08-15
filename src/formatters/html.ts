import fs from 'fs';
import path from 'path';
import { getExportMetadata, getPackageDetails, parseCommitMessage } from '../core/meta';
import { ParsedCommitType } from '../types';
import { getDefaultStyles, getTypeColor } from './html-styler';

export function exportHTML(commits: ParsedCommitType[], limit?: number): void {
  const { baseName, exportDir } = getExportMetadata();

  const now = new Date();
  const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
  const readableDate = now.toLocaleString();

  const commitTypes = new Map<string, number>();
  commits.forEach((commit) => {
    const { type } = parseCommitMessage(commit.description);
    if (type) {
      commitTypes.set(type, (commitTypes.get(type) || 0) + 1);
    }
  });

  const overviewParts: string[] = [];
  if (commitTypes.get('release'))
    overviewParts.push(`${commitTypes.get('release')} release(s) made`);
  if (commitTypes.get('feat'))
    overviewParts.push(`${commitTypes.get('feat')} features implemented`);
  if (commitTypes.get('fix')) overviewParts.push(`${commitTypes.get('fix')} bugs fixed`);
  if (commitTypes.get('docs')) overviewParts.push(`documentation updated`);
  if (commitTypes.get('test')) overviewParts.push(`improved code quality`);
  if (commitTypes.get('chore') || commitTypes.get('refactor'))
    overviewParts.push('other enhancements');

  const overview = overviewParts.join(', ') + '.';

  const metadataHTML = getMetadata(commits.length, overview);
  const tableRows = getTableRows(commits);

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
  ${getDefaultStyles()}
</head>
<body>
  <header>
    <h1>GitScope CLI Report</h1>
    <p>Generated on ${readableDate}</p>
    <p>Report Duration: Last ${limit ?? commits.length} commits</p>
  </header>
  <main role="main">
    <section aria-labelledby="summary">
      <h2 id="summary">Summary</h2>
      ${metadataHTML}
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
           ${tableRows}
        </tbody>
      </table>
    </section>
  </main>
</body>
</html>`;

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`HTML export saved to: ${filePath}`);
}

const getMetadata = (length: number, overview: string): string => {
  const { version, title } = getPackageDetails();

  return `
    <ul>
      <li><strong>Repository:</strong> ${title}</li>
      <li><strong>Version:</strong> ${version}</li>
      <li><strong>Total Commits:</strong> ${length}</li>
      <li><strong>Overview:</strong> ${overview}</li>
    </ul>
  `;
};

const getTableRows = (commits: ParsedCommitType[]) => {
  const rows = commits
    .map((commit, index) => {
      const hash = commit.hash.slice(0, 6);
      const date = new Date(commit.date).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const type = getCommitType(commit.description);
      const typeColor = getTypeColor(type);

      return `
      <tr>
        <td>${index + 1}</td>
        <td>${date}</td>
        <td style="text-align:center;"><span class="tag" style="background-color: ${typeColor}">${type}</span></td>
        <td>${commit.description}</td>
        <td>${commit.author}</td>
        <td style="text-align:center;">${hash}</td>
      </tr>                
    `;
    })
    .join('\n');

  return rows;
};

const getCommitType = (message: string): string => {
  const match = /^(\w+)(\(.+\))?!?:/.exec(message);
  return match ? match[1] : 'other';
};
