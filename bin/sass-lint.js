#!/usr/bin/env node
'use strict';

var program = require('commander'),
    meta = require('../package.json'),
    lint = require('../index');

var detects;

program
  .version(meta.version)
  .usage('[options] \'<file or glob>\'')
  .option('-q, --no-exit', 'do not exit on errors')
  .parse(process.argv);


detects = lint.lintFiles(program.args[0]);
detects = lint.format(detects);

lint.outputResults(detects);

if (program.exit) {
  lint.failOnError(detects);
}
