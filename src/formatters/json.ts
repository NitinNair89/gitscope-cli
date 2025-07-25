import fs from 'fs';
import path from 'path';
import { getExportMetadata, getPackageDetails } from '../core/meta';
import { ParsedCommitType } from '../types';

/**
 * Exports commit data as a JSON file.
 * If a file with the same name already exists, it will append a counter to the filename
 * to create a new unique filename.
 * The JSON structure includes metadata about the repository, version, branch, and the total number of commits.
 *
 * @param {ParsedCommitType[]} commits Array of commit objects to export as JSON
 * @param {string} limit Optional limit for the number of commits to include in the export
 *
 * @returns {void} This function does not return a value; it writes the JSON content to a file.
 *
 * @example
 * exportJSON(commits, 10);
 */
export function exportJSON(commits: ParsedCommitType[], limit?: number): void {
  const { baseName, exportDir } = getExportMetadata();

  let filePath = path.join(exportDir, `${baseName}.json`);
  let counter = 1;
  while (fs.existsSync(filePath)) {
    filePath = path.join(exportDir, `${baseName}-${counter++}.json`);
  }

  const { version, title } = getPackageDetails();

  const jsonPayload = {
    metadata: {
      repository: title,
      version,
      branch: 'main',
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
