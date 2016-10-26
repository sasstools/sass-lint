#!/usr/bin/env node
'use strict';

var program = require('commander'),
    meta = require('../package.json'),
    lint = require('../index');

var configPath,
    configOptions = {};

var detectPattern = function (pattern) {
  var detects;

  detects = lint.lintFiles(pattern, configOptions, configPath);

  if (program.verbose) {
    lint.outputResults(detects, configOptions, configPath);
  }

  lint.failOnError(detects, configOptions, configPath);
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
  .option('--max-warnings [integer]', 'Number of warnings to trigger nonzero exit code')
  .parse(process.argv);

// Create "options" and "files" dictionaries if they don't exist
configOptions.files = configOptions.files || {};
configOptions.options = configOptions.options || {};

if (program.config && program.config !== true) {
  configPath = program.config;
}

if (program.ignore && program.ignore !== true) {
  configOptions.files.ignore = program.ignore.split(', ');
}

if (program.syntax && ['sass', 'scss'].indexOf(program.syntax) > -1) {
  configOptions.syntax = program.syntax;
}

if (program.format && program.format !== true) {
  configOptions.options.formatter = program.format;
}

if (program.output && program.output !== true) {
  configOptions.options['output-file'] = program.output;
}

if (program.maxWarnings && program.maxWarnings !== true) {
  configOptions.options['max-warnings'] = program.maxWarnings;
}

if (program.args.length === 0) {
  detectPattern(null);
}
else {
  program.args.forEach(function (path) {
    detectPattern(path);
  });
}
