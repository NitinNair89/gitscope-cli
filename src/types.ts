/**
 * Defines types used in the git service.
 * @property {string} hash - The commit hash.
 * @property {string} author - The author of the commit.
 * @property {string} date - The date of the commit.
 * @property {string} type - The type of commit (e.g., feat, fix
 * chore, docs).
 * @property {string} description - The commit message.
 */
export type ParsedCommitType = {
  hash: string;
  author: string;
  date: string;
  type: string;
  description: string;
};
