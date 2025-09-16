import { COLORS } from '../config/enums';

/**
 * Returns a color based on the type of commit.
 * This function maps common commit types to specific colors for better visualization in HTML reports.
 *
 * @param {string} type - The type of commit (e.g., 'feat', 'fix', 'docs', etc.)
 *
 * @returns A hex color code representing the commit type.
 */
const getColorByCommitType = (type: string): string => {
  const key = type.toUpperCase();

  if (key in COLORS) {
    return COLORS[key as keyof typeof COLORS];
  }

  return COLORS.REFACTOR;
};

/**
 * Returns the default styles for the HTML report.
 * This includes basic styles for body, headings, sections, tables, and tags.
 *
 * @returns Default styles for the HTML report.
 */
const getHTMLStyle = (): string =>
  `<style>body{font-family:system-ui, sans-serif;line-height:1.6;margin:0;padding:2rem;background-color:#ffffff;color:#111827;}@media(prefers-color-scheme: dark){body{background-color:#0f172a;color:#f8fafc;}}h1,h2{color:#2563eb;}section{margin-bottom:2rem;}table{width:100%;border-collapse:collapse;margin-top:1rem;}th,td{padding:0.75rem;border:1px solid #e5e7eb;text-align:left;}th{background-color:#f1f5f9;}@media(prefers-color-scheme: dark){th{background-color:#1e293b;color:#f8fafc;}td{border-color:#334155;}}.tag{font-size:0.75rem;padding:0.25rem 0.5rem;border-radius:4px;color:#ffffff;font-weight:bold;display:inline-block;}</style>`;

export { getColorByCommitType, getHTMLStyle };
