#!/usr/bin/env node
'use strict';

var program = require('commander'),
    meta = require('../package.json'),
    lint = require('../index');

var configPath,
    ignores,
    configOptions = {};

var detectPattern = function (pattern) {
  var detects;

  detects = lint.lintFiles(pattern, configOptions, configPath);

  if (program.verbose) {
    lint.outputResults(detects, configOptions, configPath);
  }

  if (program.exit) {
    lint.failOnError(detects);
  }
};

program
  .version(meta.version)
  .usage('[options] <pattern>')
  .option('-c, --config [path]', 'path to custom config file')
  .option('-i, --ignore [pattern]', 'pattern to ignore. For multiple ignores, separate each pattern by `, ` within a string')
  .option('-q, --no-exit', 'do not exit on errors')
  .option('-v, --verbose', 'verbose output')
  .option('-f, --format [format]', 'pass one of the available eslint formats')
  .option('-o, --output [output]', 'the path and filename where you would like output to be written')
  .option('-s, --syntax [syntax]', 'syntax to evaluate the file(s) with (either sass or scss)')
  .parse(process.argv);


if (program.config && program.config !== true) {
  configPath = program.config;
}

if (program.ignore && program.ignore !== true) {
  ignores = program.ignore.split(', ');
  if (configOptions.hasOwnProperty('files')) {
    configOptions.files.ignore = ignores;
  }
  else {
    configOptions.files = {
      'ignore': ignores
    };
  }
}

if (program.syntax && ['sass', 'scss'].indexOf(program.syntax) > -1) {
  configOptions.syntax = program.syntax;
}

if (program.format && program.format !== true) {
  if (configOptions.hasOwnProperty('options')) {
    configOptions.options.formatter = program.format;
  }
  else {
    configOptions.options = {
      'formatter': program.format
    };
  }
}

if (program.output && program.output !== true) {
  if (configOptions.hasOwnProperty('options')) {
    configOptions.options['output-file'] = program.output;
  }
  else {
    configOptions.options = {
      'output-file': program.output
    };
  }
}

if (program.args.length === 0) {
  detectPattern(null);
}
else {
  program.args.forEach(function (path) {
    detectPattern(path);
  });
}
