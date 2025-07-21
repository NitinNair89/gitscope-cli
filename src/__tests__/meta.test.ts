import fs from 'fs';
import { getPackageVersion } from '../core/meta';

jest.mock('fs');

describe('core/meta', () => {
  const mockReadFileSync = fs.readFileSync as jest.Mock;

  beforeEach(() => {
    mockReadFileSync.mockReturnValue(JSON.stringify({ version: '1.0.0' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve the package version from package.json', () => {
    const version = getPackageVersion();
    expect(version).toBeDefined();
    expect(typeof version).toBe('string');
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("should set default version to '0.0.0' if package file is not found", () => {
    mockReadFileSync.mockReturnValue(JSON.stringify({}));
    const version = getPackageVersion();
    expect(version).toBe('0.0.0');
  });
});
