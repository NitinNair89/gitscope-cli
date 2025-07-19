import { getCommits } from './git-service';

/**
 * Generates a summary of the latest git commits.
 * This function retrieves the latest commits and logs them in a readable format.
 * @param limit Number of commits to summarize
 */
export function generateSummary(limit: number) {
  console.log(`🧠 Generating summary of last ${limit} commits...`);
  const commits = getCommits(limit);
  commits.forEach((commit) => console.log(commit));
}
