#!/usr/bin/env node
'use strict';

var exitCode = 0,
    lint = require('../lib/scss-lint');

process.on('exit', function () {
  process.exit(exitCode);
});