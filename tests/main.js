'use strict';

var assert = require('assert'),
    lint = require('../index');

var lintFile = function lintFile (file, options, cb) {
  cb = cb || options;
  options = options || {};

  var results = lint.lintFiles(process.cwd() + '/tests/sass/' + file, options);

  cb(results[0]);
};

describe('rule', function () {
  //////////////////////////////
  // Indentation
  //////////////////////////////
  it('indentation', function (done) {
    lintFile('indentation.scss', function (data) {
      assert.equal(8, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Line Between Blocks
  //////////////////////////////
  it('empty line between blocks', function (done) {
    lintFile('empty-line-between-blocks.scss', function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Line With Comment
  //////////////////////////////
  it('empty line between blocks with comments', function (done) {
    lintFile('empty-line-with-comments.scss', function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Ruleset
  //////////////////////////////
  it('no empty ruleset', function (done) {
    lintFile('empty-ruleset.scss', function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Extends Before Declaration
  //////////////////////////////
  it('extends before declarations', function (done) {
    lintFile('extends-before-declarations.scss', function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Extends Before Mixins
  //////////////////////////////
  it('extends before mixins', function (done) {
    lintFile('extends-before-mixins.scss', function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Final Newline w/Return
  //////////////////////////////
  it('final newline - return', function (done) {
    lintFile('final-newline--return.scss', function (data) {
      assert.equal(0, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Final Newline w/space
  //////////////////////////////
  it('final newline - space', function (done) {
    lintFile('final-newline--space.scss', function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Final Newline
  //////////////////////////////
  it('final newline', function (done) {
    lintFile('final-newline.scss', function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex Length Short - Default
  //////////////////////////////
  it('hex length - short', function (done) {
    lintFile('hex-length.scss', function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex Length Long
  //////////////////////////////
  it('hex length - long', function (done) {
    lintFile('hex-length.scss', {
      'rules': {
        'hex-length': [
          1,
          {
            'style': 'long'
          }
        ]
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Mixins Before DEclarations
  //////////////////////////////
  it('mixins before declarations', function (done) {
    lintFile('mixins-before-declarations.scss', function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Property Sort Order
  //////////////////////////////
  it('property sort order', function (done) {
    lintFile('property-sort-order.scss', {
      'rules': {
        'zero-unit': 0
      }
    }, function (data) {
      assert.equal(6, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Single Line per Selector
  //////////////////////////////
  it('single line per selector', function (done) {
    lintFile('single-line-per-selector.scss', function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space Before Brace
  //////////////////////////////
  it('space before brace', function (done) {
    lintFile('space-before-brace.scss', function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Trailing Semicolon
  //////////////////////////////
  it('trailing semicolon', function (done) {
    lintFile('trailing-semicolon.scss', function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // No IDs
  //////////////////////////////
  it('no ids', function (done) {
    lintFile('no-ids.scss', function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Leading Zero
  //////////////////////////////
  it('leading zero', function (done) {
    lintFile('leading-zero.scss', {
      'rules': {
        'zero-unit': 0
      }
    }, function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Nesting Depth
  //////////////////////////////
  it('nesting depth', function (done) {
    lintFile('nesting-depth.scss', function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Placeholder In Extends
  //////////////////////////////
  it('placeholder in extends', function (done) {
    lintFile('placeholder-in-extend.scss', function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // One Declaration Per Line
  //////////////////////////////
  it('one declaration per line', function (done) {
    lintFile('one-declaration-per-line.scss', function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space After Comma
  //////////////////////////////
  it('space after comma', function (done) {
    lintFile('space-after-comma.scss', function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space After Colon
  //////////////////////////////
  it('space after colon', function (done) {
    lintFile('space-after-colon.scss', function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space Before Colon
  //////////////////////////////
  it('space before colon', function (done) {
    lintFile('space-before-colon.scss', function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space Between Parens
  //////////////////////////////
  it('space between parens', function (done) {
    lintFile('space-between-parens.scss', function (data) {
      assert.equal(5, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // No Extends
  //////////////////////////////
  it('no extends', function (done) {
    lintFile('no-extend.scss', {
      'rules': {
        'no-extends': 1,
        'placeholder-in-extend': 0
      }
    }, function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // No Important
  //////////////////////////////
  it('no important', function (done) {
    lintFile('no-important.scss', {
      'rules': {
        'no-important': 1,
        'space-before-bang': 0,
        'space-after-bang': 0
      }
    }, function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space Before Bang
  //////////////////////////////
  it('space before bang', function (done) {
    lintFile('space-before-bang.scss', {
      'rules': {
        'space-before-bang': 1,
        'space-after-bang': 0,
        'no-important': 0
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space After Bang
  //////////////////////////////
  it('space after bang', function (done) {
    lintFile('space-after-bang.scss', {
      'rules': {
        'space-after-bang': 1,
        'space-before-bang': 0,
        'no-important': 0
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // No Debug
  //////////////////////////////
  it('no debug', function (done) {
    lintFile('no-debug.scss', function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // No Warn
  //////////////////////////////
  it('no warn', function (done) {
    lintFile('no-warn.scss', function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // String Quotes
  //////////////////////////////
  it('quotes', function (done) {
    lintFile('quotes.scss', function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Zero Unit
  //////////////////////////////

  // Default
  it('zero unit - [include: false]', function (done) {
    lintFile('zero-unit.scss', {
      'rules': {
        'zero-unit': 1
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  it('zero unit - [include: true]', function (done) {
    lintFile('zero-unit.scss', {
      'rules': {
        'zero-unit': [1, { 'include': true }]
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Clean Import Paths
  //////////////////////////////
  it('clean import paths', function (done) {
    lintFile('clean-import-paths.scss', function (data) {
      assert.equal(8, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Args
  //////////////////////////////

  // Default
  it('empty args - [include: false]', function (done) {
    lintFile('empty-args.scss', function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  it('empty args - [include: true]', function (done) {
    lintFile('empty-args.scss', {
      'rules': {
        'empty-args': [1, { include: true }]
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });
});
