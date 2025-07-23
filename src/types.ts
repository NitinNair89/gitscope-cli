/**
 * Represents a parsed Git commit extracted from `git log`.
 *
 * @property {string} hash - Full SHA hash of the commit.
 * @property {string} author - Name of the commit author.
 * @property {string} date - ISO-formatted commit date.
 * @property {string} type - Conventional commit type (e.g., feat, fix, chore, docs).
 * @property {string} description - Commit message excluding the type prefix.
 */
export type ParsedCommitType = {
  hash: string;
  author: string;
  date: string;
  type: string;
  description: string;
};

/**
 * Represents the output format for the summary.
 * This type is used to specify the desired output format when generating summaries.
 */
export type OutputFormatType = 'html' | 'json' | 'markdown';

/**
 * Represents metadata for export operations.
 * This type includes the base name for the export file, the directory where exports are saved,
 * and a timestamp for when the export was generated.
 *
 * @property {string} baseName - The base name for the export file, typically includes a timestamp.
 * @property {string} exportDir - The directory where export files are saved.
 */
export type ExportMetadataType = {
  baseName: string;
  exportDir: string;
};

/**
 * Represents the details of a package.
 * This type includes the version and name of the package,
 * which is used for metadata in exports.
 *
 * @property {string} version - The version of the package from package.json.
 * @property {string} title - The name of the package from package.json.
 */
export type PackageDetailsType = {
  version: string;
  title: string;
};

/**
 * Represents a parsed commit message.
 * This type is used to extract the type and description from a commit message.
 *
 * @property {string} type - The type of the commit (e.g., feat, fix, chore).
 * @property {string} description - The description of the commit message.
 */
export type ParsedCommitMessageType = {
  type: string;
  description: string;
};
