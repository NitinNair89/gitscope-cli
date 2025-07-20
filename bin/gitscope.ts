#!/usr/bin/env node

import { Command } from 'commander';
import { generateSummary } from '../src/core/core';

const program = new Command();

const validOutputs = ['json', 'markdown', 'html'];

program
  .name('gitscope')
  .description(
    'Summarize git commit history with meaningful groupings. Supports HTML, JSON and Markdown output formats.'
  )
  .version('0.2.0')
  .option('-l, --limit <number>', 'Number of commits to include', '10')
  .option('-o, --output <type>', 'Output format: json, markdown, html', 'json')
  .action((options) => {
    const limit = parseInt(options.limit);
    const output = options.output;

    if (!validOutputs.includes(output)) {
      console.error(`Invalid output format. Choose one of: ${validOutputs.join(', ')}`);
      process.exit(1);
    }

    if (!Number.isInteger(limit) || limit <= 0) {
      console.error('Limit must be a positive integer.');
      process.exit(1);
    }

    generateSummary(limit, output);
  });

program.parse(process.argv);
