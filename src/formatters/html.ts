import { ParsedCommitType } from '../types';

export function generateHTML(commits: ParsedCommitType[]): string {
  const rows = commits
    .map((commit) => {
      return `
      <tr>
        <td><code>${commit.hash.slice(0, 7)}</code></td>
        <td>${commit.author}</td>
        <td>${commit.date}</td>
        <td>${commit.type}</td>
        <td>${commit.description}</td>
      </tr>
    `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>gitscope | HTML Report</title>
      <style>
        body { font-family: sans-serif; padding: 2rem; }
        table { border-collapse: collapse; width: 100%; }
        th, td { padding: 0.5rem; border: 1px solid #ccc; text-align: left; vertical-align: top; }
        th { background: #f0f0f0; }
        code { background: #eee; padding: 0.2rem 0.4rem; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>gitscope | HTML Report</h1>
      <table>
        <thead>
          <tr>
            <th>Hash</th>
            <th>Author</th>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
    </html>
  `;
}
