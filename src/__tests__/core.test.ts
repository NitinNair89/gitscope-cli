import { execSync } from 'child_process';
import fs from 'fs';
import { REPORT_FORMAT } from '../config/enums';
import { MESSAGES } from '../config/messages';
import { generateSummary } from '../core/core';

jest.mock('child_process');
jest.mock('fs');

describe('Core', () => {
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

    generateSummary(2, REPORT_FORMAT.JSON, 'non-existent-branch');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `${MESSAGES.ERRORS.BRANCH_NOT_EXIST}: non-existent-branch`
    );
  });

  it.each([REPORT_FORMAT.HTML, REPORT_FORMAT.JSON, REPORT_FORMAT.MARKDOWN])(
    'should invoke execSync function to retrieve commit logs when format is %s',
    (format) => {
      generateSummary(2, format);
      expect(mockExecSync).toHaveBeenCalledTimes(2);
    }
  );

  it('should invoke execSync function to retrieve commit logs in default format', () => {
    generateSummary(2);
    expect(mockExecSync).toHaveBeenCalledTimes(2);
  });
});
