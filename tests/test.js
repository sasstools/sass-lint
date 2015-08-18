'use strict';

var lint = require('../index'),
    util = require('util'),
    detects = [],
    fs = require('fs');

// var file = fs.readFileSync('./foo.scss', 'utf-8');

// detects.push(lint.lintText({
//   'text': file,
//   'format': 'scss',
//   'filename': 'foo.scss'
// }));

detects = lint.lintFiles('**/*.s+(a|c)ss');

console.log(lint.formatResults(detects));

// console.log(util.inspect(detects, false, null));