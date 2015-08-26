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

// detects = lint.lintFiles('**/*.s+(a|c)ss');

detects = lint.lintFiles('sass/empty-line-between-blocks.scss');

console.log(lint.format(detects));

// console.log(util.inspect(detects, false, null));