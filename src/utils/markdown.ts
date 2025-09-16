import fs from 'fs';
import path from 'path';
import { COMMIT_TYPES } from '../config/enums';
import { getCommitType, getExportMetadata } from '../core/meta';
import { ParsedCommitType } from '../types';
import { getOverview } from './overview';
import { getMarkdownSummary, getReadableDate, getReportDuration, getReportTitle } from './summary';

/**
 * Exports commit data as a Markdown file.
 * If a file with the same name already exists, it will append a counter to the filename
 * to create a new unique filename.
 * The Markdown structure includes metadata about the repository, version, branch, and the total number of commits.
 *
 * @param {ParsedCommitType[]} commits Array of commit objects to export as Markdown
 *
 * @returns The generated Markdown content
 */
const generateGroupedMarkdown = (commits: ParsedCommitType[]): string => {
  const grouped: Record<string, ParsedCommitType[]> = {};

  for (const commit of commits) {
    if (commit.description.toLowerCase().startsWith('merge')) continue;
    if (!grouped[commit.type]) grouped[commit.type] = [];
    grouped[commit.type].push(commit);
  }

  // Sort types so "other" appears last
  const types = Object.keys(grouped).sort((a, b) => {
    if (a === COMMIT_TYPES.OTHER) return 1;
    if (b === COMMIT_TYPES.OTHER) return -1;
    return a.localeCompare(b);
  });

  return types
    .map((type) => {
      const sectionTitle =
        type === COMMIT_TYPES.OTHER
          ? `${COMMIT_TYPES.OTHER.charAt(0).toUpperCase()}${COMMIT_TYPES.OTHER.slice(1)}(s)`
          : `${type.charAt(0).toUpperCase()}${type.slice(1)}(s)`;
      const section = `## ${sectionTitle}\n`;
      const items = grouped[type]
        .map((c) => `- ${getCommitType(c.description).description} (\`${c.hash.slice(0, 7)}\`)`)
        .join('\n');
      return `${section}${items}\n`;
    })
    .join('\n')
    .trim();
};

/**
 * Exports commit data as a Markdown file.
 * The file will be named based on the current date and time, ensuring uniqueness.
 * If a file with the same name already exists, it will append a counter to the filename.
 * The Markdown file will include a header with metadata about the repository, version, branch,
 * and the total number of commits, as well as a summary section.
 * The body of the Markdown file will contain grouped commit data by type.
 *
 * @param {ParsedCommitType[]} commits - Array of commit objects to export as Markdown
 * @param {number} [limit] - Number of commits to include
 *
 * @example
 * exportMarkdown(commits, 30);
 */
export function exportMarkdown(commits: ParsedCommitType[], limit: number): void {
  const { baseName, exportDir } = getExportMetadata();

  let filePath = path.join(exportDir, `${baseName}.md`);
  let counter = 1;
  while (fs.existsSync(filePath)) {
    filePath = path.join(exportDir, `${baseName}-${counter++}.md`);
  }

  const header = `# ${getReportTitle()}
${getReadableDate()}  
${getReportDuration(limit)}  

---

`;

  const summary = `## Summary
${getMarkdownSummary(limit, getOverview(commits))}

---

`;

  const body = generateGroupedMarkdown(commits);

  fs.writeFileSync(filePath, `${header}${summary}${body}`, 'utf-8');
  console.log(`Markdown export saved to: ${filePath}`);
}
