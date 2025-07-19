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
