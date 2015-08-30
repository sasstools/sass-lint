#!/usr/bin/env node
'use strict';

var program = require('commander'),
    meta = require('../package.json'),
    lint = require('../index');

var detects,
    formatted;

program
  .version(meta.version)
  .usage('[options] \'<file or glob>\'')
  .option('-q, --no-exit', 'do not exit on errors')
  .parse(process.argv);


detects = lint.lintFiles(program.args[0]);
formatted = lint.format(detects);

lint.outputResults(formatted);

if (program.exit) {
  lint.failOnError(detects);
}
