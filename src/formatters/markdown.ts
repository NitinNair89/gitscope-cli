import fs from 'fs';
import path from 'path';
import { getExportMetadata, getPackageVersion } from '../core/meta';
import { ParsedCommitType } from '../types';

/**
 * Exports commit data as a Markdown file.
 * If a file with the same name already exists, it will append a counter to the filename
 * to create a new unique filename.
 * The Markdown structure includes metadata about the repository, version, branch, and the total number of commits.
 *
 * @param {ParsedCommitType[]} commits Array of commit objects to export as Markdown
 *
 * @returns {string} The generated Markdown content
 */
function generateGroupedMarkdown(commits: ParsedCommitType[]): string {
  const grouped: Record<string, ParsedCommitType[]> = {};

  for (const commit of commits) {
    if (commit.description.toLowerCase().startsWith('merge')) continue;
    if (!grouped[commit.type]) grouped[commit.type] = [];
    grouped[commit.type].push(commit);
  }

  // Sort types so "other" appears last
  const types = Object.keys(grouped).sort((a, b) => {
    if (a === 'other') return 1;
    if (b === 'other') return -1;
    return a.localeCompare(b);
  });

  return types
    .map((type) => {
      const sectionTitle =
        type === 'other' ? 'Other' : type.charAt(0).toUpperCase() + type.slice(1);
      const section = `## ${sectionTitle}\n`;
      const items = grouped[type]
        .map((c) => `- ${c.description} (\`${c.hash.slice(0, 7)}\`)`)
        .join('\n');
      return `${section}${items}\n`;
    })
    .join('\n')
    .trim();
}

/**
 * Exports commit data as a Markdown file.
 * The file will be named based on the current date and time, ensuring uniqueness.
 * If a file with the same name already exists, it will append a counter to the filename.
 * The Markdown file will include a header with metadata about the repository, version, branch,
 * and the total number of commits, as well as a summary section.
 * The body of the Markdown file will contain grouped commit data by type.
 *
 * @param {ParsedCommitType[]} commits - Array of commit objects to export as Markdown
 * @param {number} [limit] - Optional limit on the number of commits to include
 *
 * @returns {void} This function does not return a value; it writes the Markdown content to a file.
 *
 * @example
 * exportMarkdown(commits, 10);
 */
export function exportMarkdown(commits: ParsedCommitType[], limit?: number): void {
  const { baseName, exportDir } = getExportMetadata();

  let filePath = path.join(exportDir, `${baseName}.md`);
  let counter = 1;
  while (fs.existsSync(filePath)) {
    filePath = path.join(exportDir, `${baseName}-${counter++}.md`);
  }

  const header = `# GitScope CLI Report
**Repository**: gitscope-cli  
**Version**: ${getPackageVersion()}  
**Branch**: main  
**Generated at**: ${new Date().toISOString()}  

---

`;

  const summary = `## Summary
- Total Commits: ${commits.length}
- Report Duration: Last ${limit ?? commits.length} commits

---

`;

  const body = generateGroupedMarkdown(commits);

  fs.writeFileSync(filePath, `${header}${summary}${body}`, 'utf-8');
  console.log(`Markdown export saved to: ${filePath}`);
}
