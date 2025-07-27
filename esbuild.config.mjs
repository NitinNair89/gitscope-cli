import { build } from 'esbuild';

build({
  entryPoints: ['bin/gitscope.ts'],
  bundle: true,
  platform: 'node',
  target: ['node18'],
  outfile: 'dist/bin/gitscope.js',
  minify: true,
  treeShaking: true,
  sourcemap: false,
}).catch(() => process.exit(1));
