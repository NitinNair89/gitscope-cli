#!/usr/bin/env node

import { Command } from 'commander';
import { generateSummary } from '../src/core';

const program = new Command();

program
  .name('gitscope')
  .description('Summarize git commit history with meaningful groupings')
  .version('0.1.0')
  .option('-l, --limit <number>', 'Number of commits to include', '10')
  .action((options) => {
    const limit = parseInt(options.limit);
    generateSummary(limit);
  });

program.parse(process.argv);
