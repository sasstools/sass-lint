'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers'),
    gonzales = require('gonzales-pe');

describe('helpers - attemptTraversal', function () {

  //////////////////////////////
  // attemptTraversal
  //////////////////////////////
  it('attemptTraversal - SCSS - collect all nodes', function () {
    var stylesheet = gonzales.parse(['',
      '.a {',
      '  .b {',
      '    color: red;',
      '  }',
      '  .c {',
      '    color: blue;',
      '  }',
      '  .d {',
      '    color: green;',
      '  }',
      '}'].join('\n'), { syntax: 'scss' });

    assert.deepEqual(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block', 'declaration', 'property', 'ident'])
        .map(function (node) {
          return node.content;
        }),
      ['color', 'color', 'color']
    );
  });

  it('attemptTraversal - SCSS - empty array when traversal fails', function () {
    var stylesheet = gonzales.parse(['',
      '.a {',
      '  color: red;',
      '}'].join('\n'), { syntax: 'scss' });

    assert.equal(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block']).length,
      0
    );
  });

  it('attemptTraversal - Sass - collect all nodes', function () {
    var stylesheet = gonzales.parse(['',
      '.a',
      '  .b',
      '    color: red',
      '  .c',
      '    color: blue',
      '  .d',
      '    color: green',
      ''].join('\n'), { syntax: 'sass' });

    assert.deepEqual(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block', 'declaration', 'property', 'ident'])
        .map(function (node) {
          return node.content;
        }),
      ['color', 'color', 'color']
    );
  });

  it('attemptTraversal - Sass - empty array when traversal fails', function () {
    var stylesheet = gonzales.parse(['',
      '.a',
      '  color: red',
      ''].join('\n'), { syntax: 'sass' });

    assert.equal(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block']).length,
      0
    );
  });
});
