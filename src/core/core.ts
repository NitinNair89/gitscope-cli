import { generateSummaries } from '../formatters/summary-builder';
import { branchExists, getCommits } from '../services/git-service';
import { OutputFormatType } from '../types';

/**
 * Generates a summary of the latest git commits.
 * This function retrieves the latest commits and logs them in a readable format.
 *
 * @param limit Number of commits to summarize
 * @param format Desired output format (default is 'json')
 *
 * @returns {void}
 *
 * @example
 * generateSummary(30, 'json');
 */
export function generateSummary(
  limit: number = 30,
  format: OutputFormatType = 'json',
  branch: string = ''
): void {
  if (branch.length > 0 && !branchExists(branch)) {
    console.error(`Error: Branch '${branch}' does not exist in this repository.`);
    return;
  }

  console.log(`Generating summary of last ${limit} commits in ${format} format...`);
  const commits = getCommits(limit, branch);
  generateSummaries(commits, format, limit);
  console.log('Summary generation complete.');
}
