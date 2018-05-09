'use strict';

const helpers = require('../helpers');
const autoprefixer = require('../helpers-autoprefixer');

/**
 * Creates and returns a regex pattern based on all the included prefixes so that
 * we can test our values against it.
 *
 * @param {Array} identifiers - The array of identifiers / property names
 * @returns {RegExp} The regex pattern for us to test values against
 */
var precompileRegEx = function (identifiers) {
  return new RegExp(`^(${identifiers.join('|')})$`);
};

module.exports = {
  'name': 'no-selector-vendor-prefix',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': [],
  },
  'detect': function (ast, parser) {
    let result = [];
    const includes = precompileRegEx(parser.options['additional-identifiers']);
    const excludes = precompileRegEx(parser.options['excluded-identifiers']);

    ast.traverseByTypes(['pseudoElement', 'pseudoClass'], (elem) => { // eslint-disable-line consistent-return
      if (elem.contains('interpolation')) {
        return false;
      }

      let elemName = elem.first('ident').content;

      if (elemName[0] !== '-') {
        return false;
      }

      // autoprefixer requires the pseudo tokens before the element name to match
      const prefixedName = elem.is('pseudoElement') ? `::${elemName}` : `:${elemName}`;

      if (!includes.test(elemName) && (!autoprefixer.selector(prefixedName) || excludes.test(elemName))) {
        // selector is correctly prefixed - not specifically requested, is not prefixable or excluded
        return false;
      }

      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': elem.start.line,
        'column': elem.start.column,
        'message': `Selector ${elemName} should not be vendor prefixed`,
        'severity': parser.severity
      });
    });
    return result;
  }
};
