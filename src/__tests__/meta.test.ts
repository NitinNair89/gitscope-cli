import fs from 'fs';
import path from 'path';
import { getExportMetadata, getPackageVersion } from '../core/meta';

jest.mock('fs');

describe('core/meta', () => {
  const mockReadFileSync = fs.readFileSync as jest.Mock;
  const mockExistsSync = fs.existsSync as jest.Mock;

  beforeEach(() => {
    mockReadFileSync.mockReturnValue(JSON.stringify({ version: '1.0.0' }));
    mockExistsSync.mockReturnValue(true);
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

  it('should generate export metadata with a unique base name and export directory', () => {
    const { baseName, exportDir } = getExportMetadata();
    expect(baseName).toMatch(/gitscope-report-\d{8}T\d{4}/);
    expect(exportDir).toBe(path.join(process.cwd(), 'exports'));
  });

  it("should create the export directory if it doesn't exist", () => {
    const mockMkdirSync = fs.mkdirSync as jest.Mock;

    mockExistsSync.mockReturnValueOnce(false);
    getExportMetadata();
    expect(mockMkdirSync).toHaveBeenCalledWith(expect.stringContaining('exports'));
  });
});
