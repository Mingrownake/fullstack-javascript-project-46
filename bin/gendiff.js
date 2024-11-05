#!/usr/bin/env node
import { program } from 'commander';
import { parse } from '../src/parse.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filePath1, filePath2, options) => {
    parse(filePath1, filePath2);
  })
  .version('1.0.0');

program.parse();
