import fs from 'fs';
import path from 'path';
import { ParsedCommitType } from '../types';
import { getPackageVersion } from './meta';

/**
 * Exports commit data as a JSON file.
 * If a file with the same name already exists, it will append a counter to the filename
 * to create a new unique filename.
 * The JSON structure includes metadata about the repository, version, branch, and the total number of commits.
 *
 * @param {ParsedCommitType[]} commits Array of commit objects to export as JSON
 * @param {string} limit Optional limit for the number of commits to include in the export
 *
 * @returns {void}
 *
 * @example
 * exportJSON(commits, 10);
 */
export function exportJSON(commits: ParsedCommitType[], limit?: number): void {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 13);
  const baseName = `gitscope-report-${timestamp}`;
  const exportDir = path.join(process.cwd(), 'exports');

  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  let filePath = path.join(exportDir, `${baseName}.json`);
  let counter = 1;
  while (fs.existsSync(filePath)) {
    filePath = path.join(exportDir, `${baseName}-${counter++}.json`);
  }

  const jsonPayload = {
    metadata: {
      repository: 'gitscope-cli',
      version: getPackageVersion(),
      branch: 'main', // Future: Enhance with actual branch detection
      generated_at: new Date().toISOString(),
    },
    summary: {
      total_commits: commits.length,
      duration: `Last ${limit} commits`,
    },
    commits,
  };

  fs.writeFileSync(filePath, JSON.stringify(jsonPayload, null, 2), 'utf-8');
  console.log(`JSON export saved to: ${filePath}`);
}
