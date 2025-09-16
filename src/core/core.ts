import { REPORT_FORMAT } from '../config/enums';
import { MESSAGES } from '../config/messages';
import { branchExists, getCommits } from '../services/git-service';
import { OutputFormatType } from '../types';
import { exportSummary } from '../utils/summary';

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
 * generateSummary(30, 'json', 'dev);
 */
export function generateSummary(
  limit: number,
  format: OutputFormatType = REPORT_FORMAT.JSON,
  branch: string = ''
): void {
  if (branch.length > 0 && !branchExists(branch)) {
    console.error(`${MESSAGES.ERRORS.BRANCH_NOT_EXIST}: ${branch}`);
    return;
  }

  console.log(`${MESSAGES.EXPORT} ${limit} commits in ${format.toUpperCase()} format...`);
  const commits = getCommits(limit, branch);
  exportSummary(commits, format, limit);
}
