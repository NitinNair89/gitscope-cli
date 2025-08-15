import { execSync } from 'child_process';
import fs from 'fs';
import { generateSummary } from '../core/core';

jest.mock('child_process');
jest.mock('fs');

describe('core', () => {
  const mockExecSync = execSync as jest.Mock;
  const mockReadFileSync = fs.readFileSync as jest.Mock;
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
    mockExecSync.mockReset();
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();

    mockExecSync.mockReturnValue('===\n1234567890abcdef\nJohn Doe\n2023-10-01 12:00:00 +0000\n');
    mockReadFileSync.mockReturnValue(JSON.stringify({ version: '1.0.0' }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log an error if the branch does not exist', () => {
    mockExecSync.mockImplementationOnce(() => {
      throw new Error('fatal: ref non-existent-branch is not a valid ref');
    });

    generateSummary(2, 'json', 'non-existent-branch');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error: Branch 'non-existent-branch' does not exist in this repository."
    );
  });

  it('should invoke execSync function to retrieve commit logs', () => {
    generateSummary(2, 'markdown');
    expect(mockExecSync).toHaveBeenCalledTimes(2);
  });

  it('should set default limit and format option when not provided', () => {
    generateSummary();
    expect(mockExecSync).toHaveBeenCalledTimes(2);
  });
});
