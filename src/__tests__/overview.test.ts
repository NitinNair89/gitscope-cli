import { COMMIT_TYPES } from '../config/enums';
import { MESSAGES } from '../config/messages';
import { ParsedCommitType } from '../types';
import { getOverview } from '../utils/overview';

describe('Overview', () => {
  const commits: ParsedCommitType[] = [
    {
      type: COMMIT_TYPES.CHORE,
      description: 'chore: initial scaffold',
      hash: '9912226',
      author: 'John Doe',
      date: '2023-10-01T12:00:00Z',
    },
    {
      type: COMMIT_TYPES.OTHER,
      description: 'miscellaneous changes 1',
      hash: 'e4f5g6h',
      author: 'Jane Doe',
      date: '2023-11-03T12:00:00Z',
    },
    {
      type: COMMIT_TYPES.FIX,
      description: 'fix: resolve issue with CLI argument parsing',
      hash: 'a1b2c3d',
      author: 'John Doe',
      date: '2023-11-02T12:00:00Z',
    },
    {
      type: COMMIT_TYPES.DOCS,
      description: 'docs: Updated readme',
      hash: 'e4f5g6i',
      author: 'Jane Doe',
      date: '2023-11-03T12:00:00Z',
    },
    {
      type: COMMIT_TYPES.REFACTOR,
      description: 'refactor: Moved globals into utils/config',
      hash: 'e4f5g6j',
      author: 'Jane Doe',
      date: '2023-11-03T12:00:00Z',
    },
    {
      type: COMMIT_TYPES.TEST,
      description: 'test: Updated tests and snapshots',
      hash: 'a1b2c3e',
      author: 'John Doe',
      date: '2023-11-02T12:00:00Z',
    },
    {
      type: COMMIT_TYPES.FEAT,
      description: 'feat: Improved summary',
      hash: 'a1b2c3f',
      author: 'John Doe',
      date: '2023-11-02T12:00:00Z',
    },
    {
      type: COMMIT_TYPES.RELEASE,
      description: 'release: Updated tests and snapshots',
      hash: 'a1b2c3g',
      author: 'John Doe',
      date: '2023-11-02T12:00:00Z',
    },
  ];

  it('should return summary text', () => {
    const result = getOverview(commits);
    expect(result).toBeDefined();
    expect(result).toContain(MESSAGES.CHORE);
    expect(result).toContain(MESSAGES.DOCS);
    expect(result).toContain(MESSAGES.FEATURE);
    expect(result).toContain(MESSAGES.FIX);
    expect(result).toContain(MESSAGES.REFACTOR);
    expect(result).toContain(MESSAGES.RELEASE);
    expect(result).toContain(MESSAGES.TEST);
  });
});
