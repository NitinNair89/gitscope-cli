import { describe, expect, it } from '@jest/globals';
import { COLORS, COMMIT_TYPES, REPORT_FORMAT } from '../config/enums';

describe('Enums', () => {
  it('REPORT_FORMAT should be defined', () => {
    expect(REPORT_FORMAT).toBeDefined();
    expect(REPORT_FORMAT.HTML).toBeDefined();
    expect(REPORT_FORMAT.JSON).toBeDefined();
    expect(REPORT_FORMAT.MARKDOWN).toBeDefined();
  });

  it('COMMIT_TYPES should be defined', () => {
    expect(COMMIT_TYPES).toBeDefined();
    expect(COMMIT_TYPES.CHORE).toBeDefined();
    expect(COMMIT_TYPES.DOCS).toBeDefined();
    expect(COMMIT_TYPES.FEAT).toBeDefined();
    expect(COMMIT_TYPES.FIX).toBeDefined();
    expect(COMMIT_TYPES.REFACTOR).toBeDefined();
    expect(COMMIT_TYPES.RELEASE).toBeDefined();
    expect(COMMIT_TYPES.TEST).toBeDefined();
  });

  it('COLORS should be defined', () => {
    expect(COLORS).toBeDefined();
    expect(COLORS.CHORE).toBeDefined();
    expect(COLORS.DOCS).toBeDefined();
    expect(COLORS.FEAT).toBeDefined();
    expect(COLORS.FIX).toBeDefined();
    expect(COLORS.REFACTOR).toBeDefined();
    expect(COLORS.RELEASE).toBeDefined();
  });
});
