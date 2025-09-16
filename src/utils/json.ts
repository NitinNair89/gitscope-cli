import fs from 'fs';
import path from 'path';
import { getCommitType, getExportMetadata } from '../core/meta';
import { ParsedCommitType } from '../types';
import { getOverview } from './overview';
import { getJSONSummary, getReadableDate, getReportDuration, getReportTitle } from './summary';

/**
 * Exports commit data as a JSON file.
 * If a file with the same name already exists, it will append a counter to the filename
 * to create a new unique filename.
 * The JSON structure includes metadata about the repository, version, branch, and the total number of commits.
 *
 * @param {ParsedCommitType[]} commits Array of commit objects to export as JSON
 * @param {string} limit Number of commits to include in the export
 *
 * @returns {void} This function does not return a value; it writes the JSON content to a file.
 *
 * @example
 * exportJSON(commits, 30);
 */
export function exportJSON(commits: ParsedCommitType[], limit: number): void {
  const { baseName, exportDir } = getExportMetadata();

  let filePath = path.join(exportDir, `${baseName}.json`);
  let counter = 1;
  while (fs.existsSync(filePath)) {
    filePath = path.join(exportDir, `${baseName}-${counter++}.json`);
  }

  const jsonPayload = {
    metadata: {
      title: getReportTitle(),
      generated_on: getReadableDate(),
      report_duration: getReportDuration(limit),
    },
    summary: getJSONSummary(limit, getOverview(commits)),
    commits: commits.map((c) => {
      return {
        ...c,
        description: getCommitType(c.description).description,
      };
    }),
  };

  fs.writeFileSync(filePath, JSON.stringify(jsonPayload, null, 2), 'utf-8');
  console.log(`JSON export saved to: ${filePath}`);
}
