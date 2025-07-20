import { ParsedCommitType } from '../types';

export function generateGroupedMarkdown(commits: ParsedCommitType[]): string {
  const grouped: Record<string, ParsedCommitType[]> = {};

  for (const commit of commits) {
    if (commit.description.toLowerCase().startsWith('merge')) continue;
    if (!grouped[commit.type]) grouped[commit.type] = [];
    grouped[commit.type].push(commit);
  }

  // Sort types so "other" appears last
  const types = Object.keys(grouped).sort((a, b) => {
    if (a === 'other') return 1;
    if (b === 'other') return -1;
    return a.localeCompare(b);
  });

  return types
    .map((type) => {
      const sectionTitle =
        type === 'other' ? 'Other' : type.charAt(0).toUpperCase() + type.slice(1);
      const section = `## ${sectionTitle}\n`;
      const items = grouped[type]
        .map((c) => `- ${c.description} (\`${c.hash.slice(0, 7)}\`)`)
        .join('\n');
      return `${section}${items}\n`;
    })
    .join('\n')
    .trim();
}
