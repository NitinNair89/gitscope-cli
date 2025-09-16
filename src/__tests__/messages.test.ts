import { describe, expect, it } from '@jest/globals';
import { MESSAGES } from '../config/messages';

describe('Messages', () => {
  it('MESSAGES should be defined', () => {
    expect(MESSAGES).toBeDefined();
    expect(MESSAGES.CHORE).toBeDefined();
    expect(MESSAGES.DOCS).toBeDefined();
    expect(MESSAGES.FEATURE).toBeDefined();
    expect(MESSAGES.FIX).toBeDefined();
    expect(MESSAGES.REFACTOR).toBeDefined();
    expect(MESSAGES.RELEASE).toBeDefined();
    expect(MESSAGES.TEST).toBeDefined();
    expect(MESSAGES.EXPORT).toBeDefined();
    expect(MESSAGES.TITLE).toBeDefined();
    expect(MESSAGES.ERRORS.BRANCH_NOT_EXIST).toBeDefined();
    expect(MESSAGES.ERRORS.FETCH_COMMIT).toBeDefined();
    expect(MESSAGES.ERRORS.LIMIT_POSITIVE_INTEGER).toBeDefined();
  });
});
