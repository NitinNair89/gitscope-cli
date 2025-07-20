import { execSync } from 'child_process';
import { generateSummary } from '../core/core';

jest.mock('child_process');

describe('core', () => {
  const mockExecSync = execSync as jest.Mock;

  beforeEach(() => {
    mockExecSync.mockReturnValue('===\n1234567890abcdef\nJohn Doe\n2023-10-01 12:00:00 +0000\n');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should invoke execSync function to retrieve commit logs', () => {
    generateSummary(2, 'markdown');
    expect(mockExecSync).toHaveBeenCalledTimes(1);
  });
});
