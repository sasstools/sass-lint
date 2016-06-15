'use strict';

var equal = require('deep-equal'),
    assert = require('assert'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path'),
    configHelpers = require('../lib/config-helpers');

var emptyConfig = {
  options: {},
  files: {},
  rules: {}
};
var defaultConfig = yaml.safeLoad(fs.readFileSync(path.resolve('lib/config/sass-lint.yml'), 'utf8'));
var ignoreConfig = yaml.safeLoad(fs.readFileSync('tests/yml/.ignore-file.yml', 'utf8'));

var extendableConfigA1 = {
  'options': {
    'config-file': 'extend/.extend-c.yml'
  },
  'files': {},
  'rules': {
    'no-ids': 2
  }
};
var extendableConfigA2 = {
  'options': {
    'config-file': 'extend/.extend-b.yml'
  },
  'files': {},
  'rules': {
    'no-ids': 2
  }
};
var expectedA1 = {
  'options': {
    'config-file': 'extend/.extend-c.yml'
  },
  'files': {},
  'rules': {
    'no-ids': 2,
    'no-important': 2
  }
};
var expectedA2 = {
  'options': {
    'config-file': 'extend/.extend-b.yml'
  },
  'files': {},
  'rules': {
    'no-ids': 2,
    'no-important': 2,
    'no-mergeable-selectors': 2
  }
};


describe('config-helpers', function () {
  describe('loadDefaults', function () {
    it('Should load the current default config', function (done) {
      var testConfig = configHelpers.loadDefaults();

      assert(equal(defaultConfig, testConfig, {
        'strict': true
      }));
      done();
    });
  });

  describe('loadConfig', function () {
    it('Should load a config from a provided path', function (done) {
      var testConfig = configHelpers.loadConfig('tests/yml/.ignore-file.yml');

      assert(equal(ignoreConfig, testConfig, {
        'strict': true
      }));
      done();
    });

    it('should return an empty config when an incorrect path is provided', function (done) {
      var testConfig = configHelpers.loadConfig('tests/yml/non-existant.yml');

      assert(equal(emptyConfig, testConfig, {
        'strict': true
      }));
      done();
    });

    it('should return an empty config when a blank config is provided', function (done) {
      var testConfig = configHelpers.loadConfig('tests/yml/.blank.yml');

      assert(equal(emptyConfig, testConfig, {
        'strict': true
      }));
      done();
    });
  });

  describe('checkForConfigExtend', function () {
    it('should return the config it was provided when no extend is found', function (done) {
      var config = yaml.safeLoad(fs.readFileSync('tests/yml/.ignore-file.yml', 'utf8'));
      var testConfig = configHelpers.checkForConfigExtend(config);

      assert(equal(config, testConfig));
      done();
    });

    it('should return a merged config when a config specifies an extended config', function (done) {
      var testConfig = configHelpers.checkForConfigExtend(extendableConfigA1, 'tests/yml/.extend-a1.yml');
      assert(equal(expectedA1, testConfig));
      done();
    });

    it('should return a merged config when a chain of configs are specified', function (done) {
      var testConfig = configHelpers.checkForConfigExtend(extendableConfigA2, 'tests/yml/.extend-a2.yml');
      assert(equal(expectedA2, testConfig));
      done();
    });
  });
});
