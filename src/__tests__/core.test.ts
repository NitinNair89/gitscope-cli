import { execSync } from 'child_process';
import { generateSummary } from '../core/core';

jest.mock('child_process');

describe('core', () => {
  const mockExecSync = execSync as jest.Mock;
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    consoleSpy.mockClear();
    mockExecSync.mockReturnValue('===\n1234567890abcdef\nJohn Doe\n2023-10-01 12:00:00 +0000\n');
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockRestore();
  });

  it('should invoke execSync function to retrieve commit logs', () => {
    generateSummary(2, 'markdown');
    expect(mockExecSync).toHaveBeenCalledTimes(1);
  });

  it('should set default limit and format option when not provided', () => {
    generateSummary();
    expect(mockExecSync).toHaveBeenCalledTimes(1);
  });
});
