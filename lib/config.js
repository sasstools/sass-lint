'use strict';

var yaml = require('js-yaml'),
    fs = require('fs'),
    merge = require('merge'),
    defaults = yaml.safeLoad(fs.readFileSync(__dirname + '/../node_modules/scss-lint/config/default.yml', 'utf8')),
    configPath = process.cwd() + '/.scss-lint.yml',
    config = {};

if (fs.existsSync(configPath)) {
  config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
}

module.exports = merge(defaults, config);