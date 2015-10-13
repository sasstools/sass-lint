'use strict';

var equal = require('deep-equal'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge'),
    config = require('../lib/config');

var defaults = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', 'lib', 'config', 'sass-lint.yml'), 'utf8'));

var options = {
  'options': {
    'formatter': 'stylish'
  },
  'files': {
    'ignore': [
      'foo',
      'bar'
    ]
  },
  'rules': {
    'no-duplicate-property': 0,
    'indentation': [
      2,
        {
          'size': 4
        }
    ]
  }
};

describe('config', function () {
  it('should return the defaults if no config is passed in', function (done) {
    var conf = config();

    equal(
      conf,
      defaults,
      {
        'strict': true
      }
    );

    done();
  });

  it('should merge options when passed in', function (done) {
    var conf = config(options),
        merged = merge.recursive(defaults, options);

    equal(
      conf,
      merged,
      {
        'strict': true
      }
    );

    done();
  });

  it('should use a config file if one is provided', function (done) {
    var conf = config({
          'options': {
            'config-file': 'tests/yml/.stylish-output.yml'
          }
        }),
        merged = merge.recursive(defaults, fs.readFileSync(path.join(__dirname, 'yml', '.stylish-output.yml')));

    equal(
      conf,
      merged,
      {
        'strict': true
      }
    );

    done();
  });

  it('should not merge rules when `merge-default-rules` is false', function (done) {
    var opts = options,
        conf,
        merged;

    opts.options['merge-default-rules'] = false;

    merged = merge.recursive(defaults, opts);
    merged.rules = opts.rules;

    conf = config(opts);

    equal(
      conf,
      merged,
      {
        'strict': true
      }
    );

    done();
  });
});
