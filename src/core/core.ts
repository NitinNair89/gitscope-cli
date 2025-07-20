import { generateSummaries } from '../formatters/summary-builder';
import { getCommits } from '../services/git-service';
import { OutputFormatType } from '../types';

/**
 * Generates a summary of the latest git commits.
 * This function retrieves the latest commits and logs them in a readable format.
 * @param limit Number of commits to summarize
 * @param format Desired output format (default is 'json')
 *
 * @example
 * generateSummary(10, 'json');
 */
export function generateSummary(limit: number, format: OutputFormatType = 'json'): void {
  console.log(`Generating summary of last ${limit} commits in ${format} format...`);
  const commits = getCommits(limit);
  const summary = generateSummaries(commits, format);
  console.log('Summary:\n', summary);
}
