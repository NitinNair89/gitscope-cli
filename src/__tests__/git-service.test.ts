import { execSync } from 'child_process';
import { getCommits } from '../services/git-service';

jest.mock('child_process');

describe('git-service', () => {
  const mockExecSync = execSync as jest.Mock;

  beforeEach(() => {
    mockExecSync.mockReturnValue(
      '===\n1234567890abcdef\nJohn Doe\n2023-10-01 12:00:00 +0000\nfeat: Add new feature\n===\n0987654321fedcba\nJane Smith\n2023-10-02 13:00:00 +0000\nfix: Fix bug in feature\n===\nabcdef1234567890\nAlice Johnson\n2023-10-03 14:00:00 +0000\nbug: Update dependencies\n'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of commits', () => {
    const commits = getCommits(2);
    expect(Array.isArray(commits)).toBe(true);
  });

  it('should return empty [] when commits are malformed', () => {
    mockExecSync.mockReturnValue('malformed commit data');
    const commits = getCommits(2);
    expect(commits.length).toBe(0);
  });

  it('should log error in console when command fails', () => {
    mockExecSync.mockImplementation(() => {
      throw new Error('Command failed');
    });
    console.error = jest.fn();
    getCommits(2);
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch commits:',
      new Error('Command failed')
    );
  });
});
