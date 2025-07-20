import { generateSummary } from '../core/core';

describe('core', () => {
  console.log = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display formatted logs in console', () => {
    generateSummary(2);
    expect(console.log).toHaveBeenCalledTimes(3);
  });
});
