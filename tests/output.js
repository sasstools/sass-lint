'use strict';

var lint = require('../index'),
    assert = require('assert'),
    stylish = require('eslint/lib/formatters/stylish'),
    jason = require('eslint/lib/formatters/json'),
    path = require('path'),
    fs = require('fs-extra');

var results = [{
  filePath: 'sass/empty-line-between-blocks.scss',
  warningCount: 2,
  errorCount: 0,
  messages: [
    {
      ruleId: 'empty-line-between-blocks',
      line: 14,
      column: 2,
      message: 'Space expected between blocks',
      severity: 1
    },
    {
      ruleId: 'empty-line-between-blocks',
      line: 17,
      column: 2,
      message: 'Space expected between blocks',
      severity: 1
    }
  ]
}];

var styled = {
  'stylish': stylish(results),
  'json': jason(results)
};

describe('output', function () {
  it('should default to the `stylish` formatter', function (done) {
    var formatted = lint.format(results);

    assert.equal(styled.stylish, formatted);

    done();
  });

  it('should have configurable formatters', function (done) {
    var formatted = lint.format(results, {
      'options': {
        'formatter': 'json',
        'cache-config': false
      }
    });

    assert.equal(styled.json, formatted);

    done();
  });

  it('should be able to output a file', function (done) {
    var options = {
      'options': {
        'formatter': 'json',
        'output-file': 'tests/output.json',
        'cache-config': false
      }
    };

    var outPath = path.resolve(process.cwd(), options.options['output-file']),
        output = lint.outputResults(results, options);

    output = fs.readFileSync(outPath, 'utf-8');
    fs.removeSync(outPath);

    assert.equal(styled.json, output);

    done();
  });
});
