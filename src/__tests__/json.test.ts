import fs from 'fs';
import { exportJSON } from '../core/json';
import { ParsedCommitType } from '../types';

jest.mock('fs');

describe('core/json', () => {
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

  const limit = 3;

  const mockFsExistsSync = fs.existsSync as jest.Mock;
  const mockMkdirSync = fs.mkdirSync as jest.Mock;
  const mockWriteFile = fs.writeFileSync as jest.Mock;
  const mockReadFileSync = fs.readFileSync as jest.Mock;

  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    consoleSpy.mockClear();
    mockFsExistsSync.mockReturnValue(false);
    mockMkdirSync.mockReturnValue({});
    mockWriteFile.mockReturnValue(() => {});
    mockReadFileSync.mockReturnValue(JSON.stringify({ version: '1.0.0' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockRestore();
  });

  it('should create exports directory if it does not exist', () => {
    exportJSON(commits, limit);

    expect(mockMkdirSync).toHaveBeenCalledWith(expect.stringContaining('exports'));
    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).toHaveBeenCalledWith(
      expect.stringContaining('gitscope-report-'),
      expect.any(String),
      'utf-8'
    );
    expect(mockReadFileSync).toHaveBeenCalledTimes(1);
  });

  it('should protect against overwriting existing files', () => {
    mockFsExistsSync.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(false);

    exportJSON(commits, limit);

    expect(mockMkdirSync).not.toHaveBeenCalled();
    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).toHaveBeenCalled();

    const filePath = mockWriteFile.mock.calls[0][0];
    expect(filePath).toMatch(/gitscope-report.*-1\.json$/);
  });
});
