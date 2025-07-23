import fs, { readFileSync } from 'fs';
import path from 'path';
import { ExportMetadataType, PackageDetailsType, ParsedCommitMessageType } from '../types';

/**
 * Retrieves the package name and version from package.json.
 * If the version is not defined, it defaults to '0.0.0'.
 *
 * @returns {PackageDetailsType} An object containing the package name and version.
 *
 * @example
 * const {version, title } = getPackageDetails();
 */
export const getPackageDetails = (): PackageDetailsType => {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  return { version: pkg.version || '0.0.0', title: pkg.name };
};

/**
 * Generates metadata for exporting files.
 * This includes a base name for the file and the directory where exports will be saved.
 * If the export directory does not exist, it will be created.
 *
 * @returns {ExportMetadataType} An object containing the base name and export directory for JSON files.
 *
 * @example
 * const metadata = getExportMetadata();
 */
export const getExportMetadata = (): ExportMetadataType => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 13);
  const baseName = `gitscope-report-${timestamp}`;
  const exportDir = path.join(process.cwd(), 'exports');

  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  return { baseName, exportDir };
};

/**
 * Parses a commit message to extract the type and description.
 * The type is the first word before a colon, and the description is the rest of the
 * message.
 *
 * @param {string} message The commit message to parse.
 *
 * @returns {ParsedCommitMessageType} An object containing the type and description of the commit.
 */
export const parseCommitMessage = (message: string): ParsedCommitMessageType => {
  const match = /^(\w+)(\(.+\))?:\s(.+)$/.exec(message);
  if (match) {
    return {
      type: match[1],
      description: match[3],
    };
  }
  return {
    type: 'other',
    description: message,
  };
};
