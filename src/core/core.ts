import { generateSummaries } from '../formatters/summary-builder';
import { getCommits } from '../services/git-service';

/**
 * Generates a summary of the latest git commits.
 * This function retrieves the latest commits and logs them in a readable format.
 * @param limit Number of commits to summarize
 */
export function generateSummary(limit: number): void {
  console.log(`Generating summary of last ${limit} commits...`);
  const commits = getCommits(limit);
  const { markdown, json } = generateSummaries(commits);
  console.log('Markdown Summary:\n', markdown);
  console.log('\nJSON Summary:\n', json);
}
