import { COMMIT_TYPES } from '../config/enums';
import { MESSAGES } from '../config/messages';
import { getCommitType } from '../core/meta';
import { ParsedCommitType } from '../types';

/**
 * Holds commit types and their count.
 *
 * @example
 * {
 *  release: 1,
 *  feat: 5,
 *  bugs: 1
 * }
 */
const commitTypes = new Map<string, number>();

/**
 * Associates and retrieves message for a specific commit type from the Map.
 *
 * @param {string} key - Unique identifier for the commit type
 *
 * @returns Message associated for a commit type
 *
 * @example
 * getMessageByCommitType('feat'); // "5 features implemented"
 */
const getMessageByCommitType = (key: string): string => {
  const value: number = commitTypes.get(key) as number;

  switch (key) {
    case COMMIT_TYPES.RELEASE:
      return `${value} ${MESSAGES.RELEASE}`;

    case COMMIT_TYPES.FEAT:
      return `${value} ${MESSAGES.FEATURE}`;

    case COMMIT_TYPES.FIX:
      return `${value} ${MESSAGES.FIX}`;

    case COMMIT_TYPES.DOCS:
      return `${MESSAGES.DOCS}`;

    case COMMIT_TYPES.TEST:
      return `${MESSAGES.TEST}`;

    case COMMIT_TYPES.REFACTOR:
      return `${MESSAGES.REFACTOR}`;

    default:
      return `${MESSAGES.REFACTOR}`;
  }
};

/**
 * Formats an overview summary of commit types.
 *
 * @param {ParsedCommitType[]} commits Array of commit objects
 *
 * @returns The string representation of the overview text
 *
 * @example
 * getOverview(commits);
 */
const getOverview = (commits: ParsedCommitType[]): string => {
  // Populate commit types and their count in map
  commits.forEach((commit) => {
    const { type } = getCommitType(commit.description);
    if (type) {
      commitTypes.set(type, (commitTypes.get(type) || 0) + 1);
    }
  });

  const overviewParts: string[] = [];

  if (commitTypes.get(COMMIT_TYPES.RELEASE))
    overviewParts.push(getMessageByCommitType(COMMIT_TYPES.RELEASE));

  if (commitTypes.get(COMMIT_TYPES.FEAT))
    overviewParts.push(getMessageByCommitType(COMMIT_TYPES.FEAT));

  if (commitTypes.get(COMMIT_TYPES.FIX))
    overviewParts.push(getMessageByCommitType(COMMIT_TYPES.FIX));

  if (commitTypes.get(COMMIT_TYPES.DOCS))
    overviewParts.push(getMessageByCommitType(COMMIT_TYPES.DOCS));

  if (commitTypes.get(COMMIT_TYPES.TEST))
    overviewParts.push(getMessageByCommitType(COMMIT_TYPES.TEST));

  if (commitTypes.get(COMMIT_TYPES.REFACTOR))
    overviewParts.push(getMessageByCommitType(COMMIT_TYPES.REFACTOR));

  const overview = overviewParts.join(', ') + '.';

  return overview;
};

export { getOverview };
