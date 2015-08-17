'use strict';

var yaml = require('js-yaml'),
    fs = require('fs'),
    merge = require('merge'),
    defaults = yaml.safeLoad(fs.readFileSync(__dirname + '/config/sass-lint.yml', 'utf8')),
    configPath = process.cwd() + '/.sass-lint.yml';



module.exports = function (options) {
  var config = {},
      finalConfig = {};

  finalConfig = defaults;

  if (fs.existsSync(configPath)) {
    config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    finalConfig = merge(finalConfig, config);
  }

  if (options) {
    finalConfig = merge(finalConfig, options);
  }

  return finalConfig;
}