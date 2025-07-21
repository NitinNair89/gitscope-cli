import { readFileSync } from 'fs';
import path from 'path';

/**
 * Retrieves the package version from package.json.
 * If the version is not defined, it defaults to '0.0.0'.
 *
 * @returns {string} The version of the package.
 */
export function getPackageVersion(): string {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  return pkg.version || '0.0.0';
}
