#!/usr/bin/env node
'use strict';

var exitCode = 0,
    lint = require('../lib/sass-lint');

process.on('exit', function () {
  process.exit(exitCode);
});