import { execSync } from 'child_process';
import { ParsedCommitType } from '../types';

/**
 * Retrieves the latest git commits and parses them into a structured format.
 * @param limit Number of commits to retrieve
 * @returns {ParsedCommitType[]} Array of parsed commit objects
 */
export function getCommits(limit: number, branch: string): ParsedCommitType[] {
  let defaultBranch;
  try {
    defaultBranch = execSync('git symbolic-ref refs/remotes/origin/HEAD', { encoding: 'utf-8' })
      .trim()
      .replace('refs/remotes/origin/', '');
  } catch {
    defaultBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  }

  try {
    const targetBranch = branch ? `${defaultBranch}..${branch}` : '';

    const raw = execSync(
      `git log ${targetBranch} --no-merges -${limit} --pretty=format:"===%n%H%n%an%n%ad%n%s"`,
      {
        encoding: 'utf-8',
      }
    );

    const entries = raw
      .split('===')
      .map((block) => block.trim())
      .filter(Boolean);

    return entries
      .map((entry) => {
        const lines = entry.split('\n');

        if (lines.length < 4) {
          // Skip malformed entries
          return null;
        }

        const [hash, author, date, ...messageParts] = lines;
        const message = messageParts.join('\n');
        const typeMatch = /^(feat|fix|chore|docs|test|refactor|style|ci|build)(\(.+\))?:/i.exec(
          message
        );

        return {
          hash,
          author,
          date,
          description: message,
          type: typeMatch ? typeMatch[1] : 'other',
        };
      })
      .filter((commit): commit is ParsedCommitType => commit !== null);
  } catch (error) {
    console.error('Failed to fetch commits:', error);
    return [];
  }
}

export const branchExists = (branch: string) => {
  try {
    execSync(`git rev-parse --verify ${branch}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};
