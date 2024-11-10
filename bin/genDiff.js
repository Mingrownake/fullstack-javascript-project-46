#!/usr/bin/env node

import { program } from 'commander';
import difference from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format  [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = difference(filepath1, filepath2, options.format);
    console.log(diff);
  })
  .helpOption('-h, --help', 'output usage information');

program.parse();
