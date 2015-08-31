#!/usr/bin/env node
'use strict';

var program = require('commander'),
    meta = require('../package.json'),
    lint = require('../index');

var configPath,
    ignores,
    configOptions = {};

var detectPattern = function (pattern) {
  var detects,
      formatted;

  detects = lint.lintFiles(pattern, configOptions, configPath);
  formatted = lint.format(detects);


  if (program.verbose) {
    lint.outputResults(formatted);
  }


  if (program.exit) {
    lint.failOnError(detects);
  }
};

program
  .version(meta.version)
  .usage('[options] <pattern>')
  .option('-c, --config [path]', 'path to custom config file')
  .option('-i, --ignore [pattern]', 'pattern to ignore. For multiple ignores, separate each pattern by `, `')
  .option('-q, --no-exit', 'do not exit on errors')
  .option('-v, --verbose', 'verbose output')
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

if (program.args.length === 0) {
  detectPattern(null);
}
else {
  program.args.forEach(function (path) {
    detectPattern(path);
  });
}
