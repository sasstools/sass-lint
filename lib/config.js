'use strict';

var yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge');

var defaults = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'config', 'sass-lint.yml'), 'utf8'));

var findFile = function findFile (configPath, filename) {
  var HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
      dirname,
      parentDirname;

  configPath = configPath || path.join(process.cwd(), filename);

  if (fs.existsSync(configPath)) {
    return fs.realpathSync(configPath);
  }

  dirname = path.dirname(configPath);
  parentDirname = path.dirname(dirname);

  if (dirname === HOME || dirname === parentDirname) {
    return null;
  }

  configPath = path.join(parentDirname, filename);

  return findFile(configPath, filename);
};

module.exports = function (options, configPath) {
  var meta,
      metaPath,
      config,
      finalConfig = {};

  if (!configPath) {
    metaPath = findFile(null, 'package.json');
    meta = require(metaPath);

    if (meta.sasslintConfig) {
      configPath = path.resolve(path.dirname(metaPath), meta.sasslintConfig);
    }
    else {
      configPath = findFile(null, '.sass-lint.yml');
    }
  }
  else {
    configPath = path.resolve(process.cwd(), configPath);
  }

  if (fs.existsSync(configPath)) {
    config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    finalConfig = merge.recursive(defaults, config);
  }

  if (options) {
    finalConfig = merge.recursive(defaults, options);
  }

  return finalConfig;
};
