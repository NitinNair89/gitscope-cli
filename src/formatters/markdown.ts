import { ParsedCommitType } from '../types';

export function generateGroupedMarkdown(commits: ParsedCommitType[]): string {
  const grouped: Record<string, ParsedCommitType[]> = {};

  for (const commit of commits) {
    if (commit.description.toLowerCase().startsWith('merge')) continue;
    if (!grouped[commit.type]) grouped[commit.type] = [];
    grouped[commit.type].push(commit);
  }

  return Object.entries(grouped)
    .map(([type, commits]) => {
      const section = `## ${type.charAt(0).toUpperCase() + type.slice(1)}\n`;
      const items = commits.map((c) => `- ${c.description} (\`${c.hash.slice(0, 7)}\`)`).join('\n');
      return `${section}${items}\n`;
    })
    .join('\n')
    .trim();
}
