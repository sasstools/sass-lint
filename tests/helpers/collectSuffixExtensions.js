'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers'),
    gonzales = require('gonzales-pe');

describe('helpers - collectSuffixExtensions', function () {

  //////////////////////////////
  // collectSuffixExtensions
  //////////////////////////////

  it('collectSuffixExtensions - SCSS - no extensions', function () {
    var ruleset = gonzales.parse(['',
      '.a {',
      '  .b {',
      '    .c {',
      '      width: 2px;',
      '    }',
      '  }',
      '}'].join('\n'), { syntax: 'scss' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['a']
    );
  });

  it('collectSuffixExtensions - SCSS - BEM example', function () {
    var ruleset = gonzales.parse(['',
      '.block {',
      '  &__element {',
      '    &--modifier {',
      '      width: 2px;',
      '    }',
      '  }',
      '}'].join('\n'), { syntax: 'scss' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['block', 'block__element', 'block__element--modifier']
    );
  });

  it('collectSuffixExtensions - SCSS - many parents and children', function () {
    var ruleset = gonzales.parse(['',
      '.a,',
      '.b {',
      '  &c,',
      '  &d {',
      '    &e,',
      '    &f {',
      '      width: 2px;',
      '    }',
      '  }',
      '}'].join('\n'), { syntax: 'scss' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['a', 'b', 'ac', 'bc', 'ad', 'bd', 'ace', 'bce', 'ade', 'bde', 'acf', 'bcf', 'adf', 'bdf']
    );
  });

  it('collectSuffixExtensions - Sass - no extensions', function () {
    var ruleset = gonzales.parse(['',
      '.a',
      '  .b',
      '    .c',
      '      width: 2px',
      ''].join('\n'), { syntax: 'sass' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['a']
    );
  });

  it('collectSuffixExtensions - Sass - BEM example', function () {
    var ruleset = gonzales.parse(['',
      '.block',
      '  &__element',
      '    &--modifier',
      '      width: 2px',
      ''].join('\n'), { syntax: 'sass' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['block', 'block__element', 'block__element--modifier']
    );
  });

  it('collectSuffixExtensions - Sass - many parents and children', function () {
    var ruleset = gonzales.parse(['',
      '.a, .b',
      '  &c, &d',
      '    &e, &f',
      '      width: 2px',
      ''].join('\n'), { syntax: 'sass' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['a', 'b', 'ac', 'bc', 'ad', 'bd', 'ace', 'bce', 'ade', 'bde', 'acf', 'bcf', 'adf', 'bdf']
    );
  });
});
