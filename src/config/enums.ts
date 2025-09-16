/**
 * Configuration for available report formats.
 */
enum REPORT_FORMAT {
  JSON = 'json',
  MARKDOWN = 'markdown',
  HTML = 'html',
}

/**
 * Configuration for available commit types.
 */
enum COMMIT_TYPES {
  CHORE = 'chore',
  DOCS = 'docs',
  FEAT = 'feat',
  FIX = 'fix',
  REFACTOR = 'refactor',
  RELEASE = 'release',
  TEST = 'test',
  OTHER = 'other',
}

/**
 * Configuration of colors assigned to commit types
 */
enum COLORS {
  CHORE = '#ff00c3ff',
  DOCS = '#3b82f6',
  FEAT = '#1621b8ff',
  FIX = '#eab308',
  REFACTOR = '#8435b9ff',
  RELEASE = '#16a34a',
  CI = '#60440fff',
  BUILD = '#614511ff',
}

export { COLORS, COMMIT_TYPES, REPORT_FORMAT };
