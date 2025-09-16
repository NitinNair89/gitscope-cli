import fs, { readFileSync } from 'fs';
import path from 'path';
import { COMMIT_TYPES } from '../config/enums';
import { ExportMetadataType, PackageDetailsType } from '../types';

/**
 * Retrieves the package name and version from package.json.
 * If the version is not defined, it defaults to '0.0.0'.
 *
 * @returns An object containing the package name and version.
 *
 * @example
 * const {version, title } = getPackageDetails();
 */
const getPackageDetails = (): PackageDetailsType => {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  return { version: pkg.version, title: pkg.name };
};

/**
 * Generates metadata for exporting files.
 * This includes a base name for the file and the directory where exports will be saved.
 * If the export directory does not exist, it will be created.
 *
 * @returns An object containing the base name and export directory for JSON files.
 *
 * @example
 * const metadata = getExportMetadata();
 */
const getExportMetadata = (): ExportMetadataType => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 13);
  const baseName = `gitscope-report-${timestamp}`;
  const exportDir = path.join(process.cwd(), 'exports');

  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  return { baseName, exportDir };
};

/**
 * Maps git commit message to a commit type.
 *
 * @param {string} message - Commit message from git
 *
 * @returns The type and description of the commit
 *
 * @example
 * getCommitType("feat: Initial scaffold")
 */
const getCommitType = (message: string): { type: string; description: string } => {
  const match = /^(feat|fix|chore|docs|test|refactor|release|ci|build)(\(.+\))?:/i.exec(message);
  const desc = /^(\w+)(\(.+\))?:\s(.+)$/.exec(message);
  return { type: match ? match[1] : COMMIT_TYPES.OTHER, description: desc ? desc[3] : message };
};

export { getCommitType, getExportMetadata, getPackageDetails };
