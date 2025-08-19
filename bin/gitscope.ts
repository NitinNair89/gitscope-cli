#!/usr/bin/env node

import mri from 'mri';
import { generateSummary } from '../src/core/core';

const args = mri(process.argv.slice(2), {
  alias: { l: 'limit', o: 'output', b: 'branch', h: 'help' },
  default: {
    limit: 30,
    output: 'json',
  },
  string: ['output', 'branch'],
  boolean: ['help'],
});

const validOutputs = ['json', 'markdown', 'html'];

if (args.help) {
  console.log(`
Usage: gitscope [options]

Options:
  -l, --limit <number>   Number of commits to include (default: 30)
  -o, --output <format>  Output format: json, markdown, html (default: json)
  -b, --branch <name>    Branch to fetch commits from
  -h, --help             Display this help message
`);
  process.exit(0);
}

if (!validOutputs.includes(args.output)) {
  console.error(`Invalid output format. Choose one of: ${validOutputs.join(', ')}`);
  process.exit(1);
}

if (!Number.isInteger(args.limit) || args.limit <= 0) {
  console.error('Limit must be a positive integer.');
  process.exit(1);
}

generateSummary(args.limit, args.output, args.branch);
