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
      detects,
      results = [],
      errors = 0,
      warnings = 0;

  ast.traverse(function (node) {
    rules.forEach(function (rule) {
      detects = rule.rule.detect(node, rule);
      results = results.concat(detects);
      if (detects.length) {
	if (rule.severity === 1) {
	  warnings += detects.length;
	}
	else if (rule.severity === 2) {
	  errors += detects.length;
	}
      }
    });
  });


  return {
    'filePath': filename,
    'warningCount': warnings,
    'errorCount': errors,
    'messages': results
  };
}


sassLint.formatResults = function (results) {
  var stylish = require('eslint/lib/formatters/stylish');
  return stylish(results);
}

sassLint.failOnError = function (results) {
  if (results.errorCount > 0) {
    throw new Error(results.errorCount + ' errors detected in ' + results.filePath);
  }
}


module.exports = sassLint;