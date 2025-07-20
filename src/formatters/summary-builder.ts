import { OutputFormatType, ParsedCommitType } from '../types';
import { generateGroupedMarkdown } from './markdown';

/**
 * Generates Markdown and JSON summary from parsed commits.
 * @param commits Array of parsed commits.
 * @returns {string} Formatted summary string based on the specified output format.
 *
 * @example
 * generateSummaries(commits, 'json');
 */
export function generateSummaries(
  commits: ParsedCommitType[],
  format: OutputFormatType = 'json'
): string {
  switch (format) {
    case 'markdown':
      return generateGroupedMarkdown(commits);
    default:
      return JSON.stringify(commits, null, 2);
  }
}
