import fs from 'fs';
import { REPORT_FORMAT } from '../config/enums';
import { ParsedCommitType } from '../types';
import { exportSummary } from '../utils/summary';

jest.mock('fs');

describe('Summary', () => {
  const commits: ParsedCommitType[] = [
    {
      type: 'chore',
      description:
        'initial scaffold for gitscope CLI with core folder structure, config, and base logic',
      hash: '9912226',
      author: 'John Doe',
      date: '2023-10-01T12:00:00Z',
    },
    {
      type: 'other',
      description: 'miscellaneous changes 1',
      hash: 'e4f5g6h',
      author: 'Jane Doe',
      date: '2023-11-03T12:00:00Z',
    },
    {
      type: 'bug',
      description: 'bug: resolve issue with CLI argument parsing',
      hash: 'a1b2c3d',
      author: 'John Doe',
      date: '2023-11-02T12:00:00Z',
    },
    {
      type: 'other',
      description: 'miscellaneous changes 2',
      hash: 'f7g8h9i',
      author: 'Jane Doe',
      date: '2023-12-03T12:00:00Z',
    },
    {
      type: 'other',
      description: 'merge branch feature-x',
      hash: '1234567',
      author: 'John Doe',
      date: '2023-13-04T12:00:00Z',
    },
  ];

  const mockWriteFile = fs.writeFileSync as jest.Mock;
  const mockReadFileSync = fs.readFileSync as jest.Mock;

  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    consoleSpy.mockClear();
    mockWriteFile.mockReturnValue(() => {});
    mockReadFileSync.mockReturnValue(JSON.stringify({ version: '1.0.0' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockRestore();
  });

  it.each([REPORT_FORMAT.JSON, REPORT_FORMAT.MARKDOWN, REPORT_FORMAT.HTML])(
    'should generate summary when format is %s',
    (format) => {
      exportSummary(commits, format, 10);
      expect(mockWriteFile).toHaveBeenCalledTimes(1);
    }
  );
});
