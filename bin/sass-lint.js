#!/usr/bin/env node
'use strict';

var program = require('commander'),
    meta = require('../package.json'),
    lint = require('../index');

var detects,
    formatted,
    configPath,
    ignores,
    configOptions = {};

program
  .version(meta.version)
  .usage('[options] \'<file or glob>\'')
  .option('-q, --no-exit', 'do not exit on errors')
  .option('-v, --verbose', 'verbose output')
  .option('-c, --config [path]', 'path to custom config file')
  .option('-i, --ignore \'[pattern]\'', 'pattern to ignore. For multiple ignores, separate each pattern by `, `')
  .parse(process.argv);


if (program.config && program.config !== true) {
  configPath = program.config;
}

if (program.ignore && program.ignore !== true) {
  ignores = program.ignore.split(', ');
  configOptions = {
    'files': {
      'ignore': ignores
    }
  };
}

detects = lint.lintFiles(program.args[0], configOptions, configPath);
formatted = lint.format(detects);


if (program.verbose) {
  lint.outputResults(formatted);
}


if (program.exit) {
  lint.failOnError(detects);
}
