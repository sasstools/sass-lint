'use strict';

var $ = require('bluebird'),
    slConfig = require('./lib/config'),
    groot = require('./lib/groot'),
    // glob = $.promisifyAll(require('glob')),
    // fs = $.promisifyAll(require('fs')),
    // path = $.promisifyAll(require('path')),
    util = require('util'),
    slRules = require('./lib/rules');

var sassLint = function (config) {
  config = require('./lib/config')(config);

  console.log(this);
  return;
}

sassLint.getConfig = function (config) {
  return slConfig(config);
}

sassLint.lintText = function (text, format, filename) {
  var rules = slRules(this.getConfig()),
      ast = groot(text, format, filename),
      results = [],
      errors = 0,
      warnings = 0;

  // console.log(ast);

  rules.forEach(function (rule) {
    results.push(rule.rule.detect(ast, rule));
  });

  console.log(results);
  // console.log(rules);
}

// sassLint.lintPaths = function (paths) {
//   glob.globAsync(paths)
//     .then(function (matches) {
//       matches.forEach(function (match) {
//         fs.readFileAsync(match)
//           .then(function (file) {
//             var tree = groot(file, 'scss');
//             console.log(tree);
//           })
//           .catch(function (e) {
//             throw e;
//           });
//       });
//     })
//     .catch(function (e) {
//       throw e;
//     });
// }

sassLint.formatResults = function (results) {
  var stylish = require('eslint/lib/formatters/stylish');
  console.log(stylish(results));
}


module.exports = sassLint;