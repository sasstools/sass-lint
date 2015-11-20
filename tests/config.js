'use strict';

var equal = require('deep-equal'),
    assert = require('assert'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge'),
    config = require('../lib/config');

var custOptions = function () {
  return {
    'options': {
      'formatter': 'stylish',
      'cache-config': false
    },
    'files': {
      'ignore': [
        'foo',
        'bar'
      ]
    },
    'rules': {
      'no-duplicate-properties': 0,
      'indentation': [
        2,
          {
            'size': 4
          }
      ]
    }
  };
};

describe('config', function () {
  it('should return the defaults if no config is passed in', function (done) {
    var defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'lib', 'config', 'sass-lint.yml'), 'utf8')),
        conf = config();

    assert(
      equal(
        conf,
        defaultConfig,
        {
          'strict': true
        }
      )
    );

    done();
  });

  it('should merge options when passed in', function (done) {

    var defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'lib', 'config', 'sass-lint.yml'), 'utf8')),
        tempOptions = custOptions(),
        conf = config(tempOptions),
        merged = merge.recursive(defaultConfig, tempOptions);

    assert(
      equal(
        conf,
        merged,
        {
          'strict': true
        }
      )
    );

    done();
  });

  it('should use a config file if one is provided', function (done) {
    var defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'lib', 'config', 'sass-lint.yml'), 'utf8')),
        tempOptions = {
          'options': {
            'config-file': 'tests/yml/.stylish-output.yml',
            'cache-config': false
          }
        },
        conf = config(tempOptions),
        merged = merge.recursive(defaultConfig, tempOptions, yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'yml', '.stylish-output.yml'), 'utf8')));

    assert(
      equal(
        conf,
        merged,
        {
          'strict': true
        }
      )
    );

    done();
  });

  it('should not merge default rules when `merge-default-rules` is false in config file [check unique]', function (done) {
    var defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'lib', 'config', 'sass-lint.yml'), 'utf8')),
        tempOptions = custOptions(),
        conf,
        merged;

    conf = config(tempOptions, path.join(__dirname, 'yml', '.no-merge-default.yml'));
    merged = merge.recursive(defaultConfig, tempOptions);

    assert(
      !equal(
        conf,
        merged,
        {
          'strict': true
        }
      )
    );

    done();
  });

  it('should not merge default rules when `merge-default-rules` is false in config file [check equal]', function (done) {
    var customConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'yml', '.no-merge-default.yml'), 'utf8')),
        tempOptions = custOptions(),
        conf,
        merged;


    conf = config(tempOptions, path.join(__dirname, 'yml', '.no-merge-default.yml'));
    merged = merge.recursive(customConfig, tempOptions);

    assert(
      equal(
        conf,
        merged,
        {
          'strict': true
        }
      )
    );

    done();
  });

  it('should not merge custom option rules when `merge-default-rules` is false', function (done) {
    var defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'lib', 'config', 'sass-lint.yml'), 'utf8')),
        tempOptions = custOptions(),
        conf,
        merged;

    tempOptions.options['merge-default-rules'] = false;
    conf = config(tempOptions);
    merged = merge.recursive(tempOptions, defaultConfig);
    merged.rules = tempOptions.rules;

    assert(
      equal(
        conf,
        merged,
        {
          'strict': true
        }
      )
    );

    done();
  });

  it('should load a cached version of the config', function (done) {
    var tempOptions = {
          'options': {}
        },
        confFirst,
        confSecond;

    tempOptions.options['cache-config'] = true;

    // first pass at config to set the cache
    confFirst = config(tempOptions);

    // second pass to check if cache loads adding in a config file that shouldn't be loaded
    tempOptions.options['config-file'] = 'tests/yml/.stylish-output.yml';
    confSecond = config(tempOptions);

    assert(
      equal(
        confFirst,
        confSecond,
        {
          'strict': true
        }
      )
    );

    done();
  });
});
