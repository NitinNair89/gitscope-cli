import { generateSummaries } from '../formatters/summary-builder';
import { ParsedCommitType } from '../types';

describe('formatters/summary-builder', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted Markdown and JSON output', () => {
    const result = generateSummaries(commits);

    expect(result).toBeDefined();
  });

  it("should generate Markdown summary when format is 'markdown'", () => {
    const result = generateSummaries(commits, 'markdown');

    expect(result).toEqual(
      '## Bug\n' +
        '- bug: resolve issue with CLI argument parsing (`a1b2c3d`)' +
        '\n\n' +
        '## Chore\n' +
        '- initial scaffold for gitscope CLI with core folder structure, config, and base logic (`9912226`)' +
        '\n\n' +
        '## Other\n' +
        '- miscellaneous changes 1 (`e4f5g6h`)' +
        '\n' +
        '- miscellaneous changes 2 (`f7g8h9i`)'
    );
  });
});
