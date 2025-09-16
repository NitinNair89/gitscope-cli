import { REPORT_FORMAT } from '../config/enums';
import { MESSAGES } from '../config/messages';
import { getPackageDetails } from '../core/meta';
import { MetadataType, OutputFormatType, ParsedCommitType } from '../types';
import { exportHTML } from './html';
import { exportJSON } from './json';
import { exportMarkdown } from './markdown';

/**
 * Generates HTML, Markdown and JSON summary from parsed commits.
 *
 * @param {ParsedCommitType[]} commits - Array of parsed commits.
 * @param {OutputFormatType} format - Formatted summary string based on the specified output format
 * @param {number} limit - Number of commits to include in the export
 *
 * @example
 * exportSummary(commits, 'json');
 */
const exportSummary = (
  commits: ParsedCommitType[],
  format: OutputFormatType = REPORT_FORMAT.JSON,
  limit: number
): void => {
  switch (format) {
    case REPORT_FORMAT.MARKDOWN:
      exportMarkdown(commits, limit);
      break;

    case REPORT_FORMAT.JSON:
      exportJSON(commits, limit);
      break;

    case REPORT_FORMAT.HTML:
      exportHTML(commits, limit);
  }
};

/**
 * Prepares metadata information for the report summary
 *
 * @param {number} length - Number of commits to include in the export
 * @param {string} overview - The string representation of the overview text
 *
 * @returns Data for the summary section
 *
 * @example
 * getMetadata(10, "1 release, 2 features implemented")
 */
const getMetadata = (length: number, overview: string): MetadataType => {
  const { version, title } = getPackageDetails();

  return {
    repository: title,
    version,
    total_commits: length,
    overview: overview,
  };
};

/**
 * Formats summary for HTML report.
 *
 * @param {number} length - Number of commits to include in the export
 * @param {string} overview - The string representation of the overview text
 *
 * @returns HTML-formatted string for the summary section
 *
 * @example
 * getHTMLSummary(10, "1 release, 2 features implemented")
 */
const getHTMLSummary = (length: number, overview: string): string => {
  const summary = getMetadata(length, overview);

  return `
    <ul>
      <li><strong>Repository:</strong> ${summary.repository}</li>
      <li><strong>Version:</strong> ${summary.version}</li>
      <li><strong>Total Commits:</strong> ${summary.total_commits}</li>
      <li><strong>Overview:</strong> ${summary.overview}</li>
    </ul>
  `;
};

/**
 * Formats summary for JSON report.
 *
 * @param {number} length - Number of commits to include in the export
 * @param {string} overview - The string representation of the overview text
 *
 * @returns HTML-formatted string for the summary section
 *
 * @example
 * getJSONSummary(10, "1 release, 2 features implemented")
 */
const getJSONSummary = (length: number, overview: string) => {
  const summary = getMetadata(length, overview);

  return {
    repository: summary.repository,
    version: summary.version,
    total_commits: summary.total_commits,
    overview: summary.overview,
  };
};

/**
 * Formats summary for Markdown report.
 *
 * @param {number} length - Number of commits to include in the export
 * @param {string} overview - The string representation of the overview text
 *
 * @returns HTML-formatted string for the summary section
 *
 * @example
 * getMarkdownSummary(10, "1 release, 2 features implemented")
 */
const getMarkdownSummary = (length: number, overview: string) => {
  const summary = getMetadata(length, overview);

  return `
**Repository**: ${summary.repository}  
**Version**: ${summary.version}  
**Total Commits**: ${summary.total_commits}  
**Overview**: ${summary.overview}  
`;
};

const getCommitDate = (date: string) => {
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formats current system date and time in a human-readable string
 * @returns Date and time as dd/mm/yyyy, hh:mm:ss am/pm
 */
const getReadableDate = () => `Generated on ${new Date().toLocaleString()}`;

/**
 * Report title available across all the report formats
 * @returns a string representating the report title
 */
const getReportTitle = () => MESSAGES.TITLE;

/**
 * Report duration available across all the report formats
 * @returns a string representating the report duration
 */
const getReportDuration = (limit: number) => `Report Duration: Last ${limit} commits`;

export {
  exportSummary,
  getCommitDate,
  getHTMLSummary,
  getJSONSummary,
  getMarkdownSummary,
  getReadableDate,
  getReportDuration,
  getReportTitle,
};
