import { OutputFormatType, ParsedCommitType } from '../types';
import { generateHTML } from './html';
import { exportJSON } from './json';
import { exportMarkdown } from './markdown';

/**
 * Generates Markdown and JSON summary from parsed commits.
 * @param {ParsedCommitType[]} commits Array of parsed commits.
 * @returns {string} format Formatted summary string based on the specified output format
 * @param {number} limit Optional limit for the number of commits to include in the export
 *
 * @returns {string | void} Returns a Markdown or HTML string, or void if JSON is generated.
 *
 * @example
 * generateSummaries(commits, 'json');
 */
export function generateSummaries(
  commits: ParsedCommitType[],
  format: OutputFormatType = 'json',
  limit?: number
): string | void {
  switch (format) {
    case 'markdown':
      exportMarkdown(commits, limit);
      break;

    case 'json':
      exportJSON(commits, limit);
      break;

    case 'html':
      return generateHTML(commits);
  }
}
