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
    lintFile('indentation.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'indentation': 1
      }
    }, function (data) {
      assert.equal(8, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Line Between Blocks
  //////////////////////////////
  it('empty line between blocks', function (done) {
    lintFile('empty-line-between-blocks.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'empty-line-between-blocks': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Line With Comment
  //////////////////////////////
  it('empty line between blocks with comments', function (done) {
    lintFile('empty-line-with-comments.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'empty-line-between-blocks': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Ruleset
  //////////////////////////////
  it('no empty ruleset', function (done) {
    lintFile('empty-ruleset.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'empty-ruleset': 1
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Extends Before Declaration
  //////////////////////////////
  it('extends before declarations', function (done) {
    lintFile('extends-before-declarations.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'extends-before-declarations': 1
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Extends Before Mixins
  //////////////////////////////
  it('extends before mixins', function (done) {
    lintFile('extends-before-mixins.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'extends-before-mixins': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Final Newline w/Return
  //////////////////////////////
  it('final newline - return', function (done) {
    lintFile('final-newline--return.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'final-newline': 1
      }
    }, function (data) {
      assert.equal(0, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Final Newline w/space
  //////////////////////////////
  it('final newline - space', function (done) {
    lintFile('final-newline--space.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'final-newline': 1
      }
    }, function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Final Newline
  //////////////////////////////
  it('final newline', function (done) {
    lintFile('final-newline.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'final-newline': 1
      }
    }, function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex Length Short - Default
  //////////////////////////////
  it('hex length - short', function (done) {
    lintFile('hex-length.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'hex-length': 1,
        'color-variable': 0
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex Length Long
  //////////////////////////////
  it('hex length - long', function (done) {
    lintFile('hex-length.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'hex-length': [
          1,
          {
            'style': 'long'
          }
        ],
        'color-variable': 0
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex notation Lowercase - Default
  //////////////////////////////
  it('hex notation - lowercase', function (done) {
    lintFile('hex-notation.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'hex-notation': 1
      }
    }, function (data) {
      assert.equal(6, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex Notation Uppercase
  //////////////////////////////
  it('hex notation - uppercase', function (done) {
    lintFile('hex-notation.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'hex-notation': [
          1,
          {
            'style': 'uppercase'
          }
        ]
      }
    }, function (data) {
      assert.equal(7, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex Validation
  //////////////////////////////
  it('hex validation', function (done) {
    lintFile('hex-validation.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'hex-validation': 1
      }
    }, function (data) {
      assert.equal(16, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Mixins Before Declarations
  //////////////////////////////
  it('mixins before declarations', function (done) {
    lintFile('mixins-before-declarations.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'mixins-before-declarations': 1
      }
    }, function (data) {
      assert.equal(5, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Mixins Before Declarations - overwrite
  //////////////////////////////
  it('mixins before declarations - excludes', function (done) {
    lintFile('mixins-before-declarations.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'mixins-before-declarations': [
          1,
          {
            'exclude': [
              'test-again',
              'waldo',
              'mq',
              'breakpoint'
            ]
          }
        ]
      }
    }, function (data) {
      assert.equal(0, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Property Sort Order
  //////////////////////////////

  // Default
  it('property sort order - [order: alphabetical]', function (done) {
    lintFile('property-sort-order.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'property-sort-order': 1
      }
    }, function (data) {
      assert.equal(6, data.warningCount);
      done();
    });
  });

  it('property sort order - [order: custom]', function (done) {
    lintFile('property-sort-order.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'property-sort-order': [
          1,
          {
            'order': [
              'height',
              'width',
              'display',
              'color'
            ]
          }
        ]
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  it('property sort order - [order: recess]', function (done) {
    lintFile('property-sort-order.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'property-sort-order': [
          1,
          {
            'order': 'recess'
          }
        ]
      }
    }, function (data) {
      assert.equal(5, data.warningCount);
      done();
    });
  });

  it('property sort order - [order: smacss]', function (done) {
    lintFile('property-sort-order.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'property-sort-order': [
          1,
          {
            'order': 'smacss'
          }
        ]
      }
    }, function (data) {
      assert.equal(5, data.warningCount);
      done();
    });
  });

  it('property sort order - [order: concentric]', function (done) {
    lintFile('property-sort-order.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'property-sort-order': [
          1,
          {
            'order': 'concentric'
          }
        ]
      }
    }, function (data) {
      assert.equal(7, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Single Line per Selector
  //////////////////////////////
  it('single line per selector', function (done) {
    lintFile('single-line-per-selector.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'single-line-per-selector': 1
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space Before Brace
  //////////////////////////////
  it('space before brace', function (done) {
    lintFile('space-before-brace.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-before-brace': 1
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Trailing Semicolon
  //////////////////////////////
  it('trailing semicolon', function (done) {
    lintFile('trailing-semicolon.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'trailing-semicolon': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // No IDs
  //////////////////////////////
  it('no ids', function (done) {
    lintFile('no-ids.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'no-ids': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Leading Zero
  //////////////////////////////
  it('leading zero', function (done) {
    lintFile('leading-zero.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'leading-zero': 1
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
    lintFile('nesting-depth.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'nesting-depth': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Placeholder In Extends
  //////////////////////////////
  it('placeholder in extends', function (done) {
    lintFile('placeholder-in-extend.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'placeholder-in-extend': 1
      }
    }, function (data) {
      assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // One Declaration Per Line
  //////////////////////////////
  it('one declaration per line', function (done) {
    lintFile('one-declaration-per-line.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'one-declaration-per-line': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space After Comma
  //////////////////////////////

  // Default
  it('space after comma - [include: true]', function (done) {
    lintFile('space-after-comma.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-after-comma': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  it('space after comma - [include: false]', function (done) {
    lintFile('space-after-comma.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-after-comma': [
          1,
          {
            'include': false
          }
        ]
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space After Colon
  //////////////////////////////

  // Default
  it('space after colon - [include: true]', function (done) {
    lintFile('space-after-colon.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-after-colon': 1
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  it('space after colon - [include: false]', function (done) {
    lintFile('space-after-colon.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-after-colon': [
          1,
          {
            'include': false
          }
        ]
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space Before Colon
  //////////////////////////////

  // Default
  it('space before colon - [include: false]', function (done) {
    lintFile('space-before-colon.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-before-colon': 1
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  it('space before colon - [include: true]', function (done) {
    lintFile('space-before-colon.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-before-colon': [
          1,
          {
            'include': true
          }
        ]
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Space Between Parens
  //////////////////////////////
  it('space between parens', function (done) {
    lintFile('space-between-parens.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-between-parens': 1
      }
    }, function (data) {
      assert.equal(5, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // No Extends
  //////////////////////////////
  it('no extends', function (done) {
    lintFile('no-extend.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'no-extend': 1
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
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'no-important': 1
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
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-before-bang': 1
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
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'space-after-bang': 1
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
    lintFile('no-debug.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'no-debug': 1
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // No Warn
  //////////////////////////////
  it('no warn', function (done) {
    lintFile('no-warn.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'no-warn': 1
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // String Quotes
  //////////////////////////////
  it('quotes', function (done) {
    lintFile('quotes.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'quotes': 1
      }
    }, function (data) {
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
      'options': {
        'merge-default-rules': false
      },
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
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'zero-unit': [
          1,
          {
            'include': true
          }
        ]
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Args
  //////////////////////////////

  // Default
  it('empty args - [include: false]', function (done) {
    lintFile('empty-args.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'empty-args': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  it('empty args - [include: true]', function (done) {
    lintFile('empty-args.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'empty-args': [
          1,
          {
            'include': true
          }
        ]
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Border Zero
  //////////////////////////////

  // Default
  it('border zero - [convention: \'0\']', function (done) {
    lintFile('border-zero.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'border-zero': 1
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  it('border zero - [convention: \'none\']', function (done) {
    lintFile('border-zero.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'border-zero': [
          1,
          {
            'contention': 'none'
          }
        ]
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Comment - no allowed
  //////////////////////////////
  it('comment', function (done) {
    lintFile('comment.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'comment': 1
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Comment - 2 allowed
  //////////////////////////////
  it('comment - allowed regEx', function (done) {
    lintFile('comment.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'comment': [
          1,
          {
            'allowed': [
              '^[\/* ]*Bad',
              '/\* Test Comment'
            ]
          }
        ]
      }
    }, function (data) {
      assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Duplicate Property
  //////////////////////////////
  it('no duplicate property', function (done) {
    lintFile('no-duplicate-property.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'no-duplicate-property': 1
      }
    }, function (data) {
      assert.equal(3, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Variable for Property
  //////////////////////////////
  it('variable for property - no properties', function (done) {
    lintFile('variable-for-property.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'variable-for-property': 1
      }
    }, function (data) {
      assert.equal(0, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Variable for Property - with properties
  //////////////////////////////
  it('variable for property - properties', function (done) {
    lintFile('variable-for-property.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'variable-for-property': [
          1,
          {
            'properties': [
              'margin',
              'content'
            ]
          }
        ]
      }
    }, function (data) {
      assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Color Keyword
  //////////////////////////////
  it('color keyword', function (done) {
    lintFile('color-keyword.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'color-keyword': 1
      }
    }, function (data) {
      assert.equal(8, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Color Variable
  //////////////////////////////
  it('color variable', function (done) {
    lintFile('color-variable.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'color-variable': 1
      }
    }, function (data) {
      assert.equal(19, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Color Variable - allow rgba
  //////////////////////////////
  it('color variable - allow rgba', function (done) {
    lintFile('color-variable.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'color-variable': [
          1,
          {
            'allow-rgba': true
          }
        ]
      }
    }, function (data) {
      assert.equal(18, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Clean Import Paths
  //////////////////////////////

  // Default
  it('clean import paths - [leading-underscore: false, filename-extension: false]', function (done) {
    lintFile('clean-import-paths.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'clean-import-paths': 1
      }
    }, function (data) {
      assert.equal(8, data.warningCount);
      done();
    });
  });

  it('clean import paths - [leading-underscore: true, filename-extension: false]', function (done) {
    lintFile('clean-import-paths.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'clean-import-paths': [
          1,
          {
            'leading-underscore': true
          }
        ]
      }
    }, function (data) {
      assert.equal(8, data.warningCount);
      done();
    });
  });

  it('clean import paths - [leading-underscore: false, filename-extension: true]', function (done) {
    lintFile('clean-import-paths.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'clean-import-paths': [
          1,
          {
            'filename-extension': true
          }
        ]
      }
    }, function (data) {
      assert.equal(8, data.warningCount);
      done();
    });
  });

  it('clean import paths - [leading-underscore: true, filename-extension: true]', function (done) {
    lintFile('clean-import-paths.scss', {
      'options': {
        'merge-default-rules': false
      },
      'rules': {
        'clean-import-paths': [
          1,
          {
            'leading-underscore': true,
            'filename-extension': true
          }
        ]
      }
    }, function (data) {
      assert.equal(8, data.warningCount);
      done();
    });
  });
});
