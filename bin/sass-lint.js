#!/usr/bin/env node
'use strict';

var exitCode = 0,
    lint = require('../index');

process.on('exit', function () {
  process.exit(exitCode);
});
