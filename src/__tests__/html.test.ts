import { generateHTML } from '../formatters/html';
import { ParsedCommitType } from '../types';

describe('formatters/html', () => {
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

  it('should return formatted HTML document', () => {
    const result = generateHTML(commits);
    expect(result).toContain('<!DOCTYPE html>');
    expect(result).toContain('<title>gitscope | HTML Report</title>');
    expect(result).toContain('<table>');
    expect(result).toContain('<td><code>9912226</code></td>');
    expect(result).toContain('<td>John Doe</td>');
    expect(result).toContain('<td>2023-10-01T12:00:00Z</td>');
    expect(result).toContain('<td>chore</td>');
  });
});
