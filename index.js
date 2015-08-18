'use strict';

var slConfig = require('./lib/config'),
    groot = require('./lib/groot'),
    glob = require('glob'),
    path = require('path'),
    fs = require('fs'),
    util = require('util'),
    slRules = require('./lib/rules');

var sassLint = function (config) {
  config = require('./lib/config')(config);

  console.log(this);
  return;
};

sassLint.getConfig = function (config) {
  return slConfig(config);
};

sassLint.lintText = function (file, options) {
  var rules = slRules(this.getConfig(options)),
      ast = groot(file.text, file.format, file.filename),
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
    'filePath': file.filename,
    'warningCount': warnings,
    'errorCount': errors,
    'messages': results
  };
};

sassLint.lintFiles = function (files, options) {
  var files = glob.sync(files),
      _this = this,
      results = [];


  files.forEach(function (file) {
    var lint = _this.lintText({
      'text': fs.readFileSync(file),
      'format': path.extname(file).replace('.', ''),
      'filename': file
    }, options);
    results.push(lint);
  });

  return results;
};


sassLint.formatResults = function (results) {
  var stylish = require('eslint/lib/formatters/stylish');
  return stylish(results);
};

sassLint.failOnError = function (results) {
  if (results.errorCount > 0) {
    throw new Error(results.errorCount + ' errors detected in ' + results.filePath);
  }
};


module.exports = sassLint;