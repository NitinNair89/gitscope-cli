#!/usr/bin/env node

import mri from 'mri';
import { REPORT_FORMAT } from '../src/config/enums';
import { MESSAGES } from '../src/config/messages';
import { generateSummary } from '../src/core/core';

const args = mri(process.argv.slice(2), {
  alias: { l: 'limit', o: 'output', b: 'branch', h: 'help' },
  default: {
    output: 'json',
  },
  string: ['output', 'branch'],
  boolean: ['help'],
});

const validOutputs = [REPORT_FORMAT.JSON, REPORT_FORMAT.MARKDOWN, REPORT_FORMAT.HTML];

if (args.help || process.argv.slice(2).length == 0) {
  console.log(`
Usage: gitscope [options]

Options:
  -l, --limit <number>   Number of commits to include
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
  console.error(MESSAGES.ERRORS.LIMIT_POSITIVE_INTEGER);
  process.exit(1);
}

generateSummary(args.limit, args.output, args.branch);
