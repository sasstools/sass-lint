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
      configMerge = false,
      optionsMerge = false,
      config = {},
      finalConfig = {};

  options = options ? options : {};

  if (options.options && options.options['config-file']) {
    configPath = options.options['config-file'];
  }

  if (!configPath) {
    metaPath = findFile(false, 'package.json');
    meta = require(metaPath);

    if (meta.sasslintConfig) {

      configPath = path.resolve(path.dirname(metaPath), meta.sasslintConfig);
    }
    else {
      configPath = findFile(false, '.sass-lint.yml');
    }
  }
  else if (!path.isAbsolute(configPath)) {
    configPath = path.resolve(process.cwd(), configPath);
  }

  if (configPath) {
    if (fs.existsSync(configPath)) {
      config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    }
  }

  configMerge = (config.options && config.options['merge-default-rules'] === false) ? false : true;
  optionsMerge = (options.options && options.options['merge-default-rules'] === false) ? false : true;

  finalConfig = defaults;

  if (configMerge) {
    finalConfig = merge.recursive(defaults, config);
  }
  else if (!configMerge) {
    finalConfig.rules = config.rules ? config.rules : {};
  }

  if (options && optionsMerge) {
    finalConfig = merge.recursive(finalConfig, options);
  }
  else if (options && !optionsMerge) {
    finalConfig.rules = options.rules ? options.rules : {};
  }

  return finalConfig;
};
