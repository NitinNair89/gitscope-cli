import fs from 'fs';
import path from 'path';
import { COMMIT_TYPES } from '../config/enums';
import { getCommitType, getExportMetadata, getPackageDetails } from '../core/meta';

jest.mock('fs');

describe('Meta', () => {
  const mockReadFileSync = fs.readFileSync as jest.Mock;
  const mockExistsSync = fs.existsSync as jest.Mock;

  beforeEach(() => {
    mockReadFileSync.mockReturnValue(JSON.stringify({ version: '1.0.0', name: 'gitscope' }));
    mockExistsSync.mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve the package version and name from package.json', () => {
    const { version, title } = getPackageDetails();
    expect(version).toBeDefined();
    expect(title).toBeDefined();
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
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

  it('should parse commit message and return type and description', () => {
    const { type, description } = getCommitType('test: Tests updated');
    expect(type).toBeDefined();
    expect(description).toBeDefined();
    expect(type).toEqual(COMMIT_TYPES.TEST);
    expect(description).toEqual('Tests updated');
  });
});
