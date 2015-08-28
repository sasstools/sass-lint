'use strict';

var yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge');

var defaults = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '/config/sass-lint.yml'), 'utf8')),
    configPath = path.join(process.cwd(), '/.sass-lint.yml');

module.exports = function (options) {
  var config = {},
      finalConfig = {};

  finalConfig = defaults;

  if (fs.existsSync(configPath)) {
    config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    finalConfig = merge.recursive(finalConfig, config);
  }

  if (options) {
    finalConfig = merge.recursive(finalConfig, options);
  }

  return finalConfig;
};
