import fs, { readFileSync } from 'fs';
import path from 'path';
import { ExportMetadataType } from '../types';

/**
 * Retrieves the package version from package.json.
 * If the version is not defined, it defaults to '0.0.0'.
 *
 * @returns {string} The version of the package.
 *
 * @example
 * const version = getPackageVersion();
 */
export const getPackageVersion = (): string => {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  return pkg.version || '0.0.0';
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
