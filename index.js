'use strict';

var slConfig = require('./lib/config'),
    groot = require('./lib/groot'),
    helpers = require('./lib/helpers'),
    slRules = require('./lib/rules'),
    glob = require('glob'),
    path = require('path'),
    fs = require('fs');


var sassLint = function (config) {
  config = require('./lib/config')(config);
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

  rules.forEach(function (rule) {
    detects = rule.rule.detect(ast, rule);
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

  results.sort(helpers.sortDetects);

  return {
    'filePath': file.filename,
    'warningCount': warnings,
    'errorCount': errors,
    'messages': results
  };
};

sassLint.lintFiles = function (files, options) {
  var that = this,
      results = [];

  if (files) {
    files = glob.sync(files);
  }
  else {
    files = this.getConfig(options).files;

    if (typeof files === 'string') {
      files = glob.sync(files);
    }
    else {
      files = glob.sync(files.include, {
        'ignore': files.ignore
      });
    }
  }

  files.forEach(function (file) {
    var lint = that.lintText({
      'text': fs.readFileSync(file),
      'format': path.extname(file).replace('.', ''),
      'filename': file
    }, options);
    results.push(lint);
  });

  return results;
};


sassLint.format = function (results) {
  var stylish = require('eslint/lib/formatters/stylish');
  return stylish(results);
};

sassLint.outputResults = function (results) {
  console.log(results);
  return results;
};

sassLint.failOnError = function (results) {
  var result,
      i;

  for (i = 0; i < results.length; i++) {
    result = results[i];

    if (result.errorCount > 0) {
      throw new Error(result.errorCount + ' errors detected in ' + result.filePath);
    }
  }
};

module.exports = sassLint;

