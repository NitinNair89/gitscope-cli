import { ParsedCommitType } from '../types';
import { generateGroupedMarkdown } from './markdown';

/**
 * Generates Markdown and JSON summary from parsed commits.
 * @param commits Array of parsed commits.
 * @returns An object containing markdown and JSON string outputs.
 */
export function generateSummaries(commits: ParsedCommitType[]): { markdown: string; json: string } {
  return {
    markdown: generateGroupedMarkdown(commits),
    json: JSON.stringify(commits, null, 2),
  };
}
