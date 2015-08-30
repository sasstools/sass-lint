#!/usr/bin/env node
'use strict';

var program = require('commander'),
    meta = require('../package.json');

var exitCode = 0;
    // lint = require('../index');

program
  .version(meta.version)
  .parse(process.argv);

// if (program.version) {
//   console.log('v' + program.version);
// }

// console.log(userArgs);
