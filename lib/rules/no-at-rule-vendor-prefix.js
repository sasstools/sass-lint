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
  'name': 'no-at-rule-vendor-prefix',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': [],
  },
  'detect': function (ast, parser) {
    let result = [];
    const includes = precompileRegEx(parser.options['additional-identifiers']);
    const excludes = precompileRegEx(parser.options['excluded-identifiers']);

    ast.traverseByType('atkeyword', (atRule) => { // eslint-disable-line consistent-return
      // check and ignore at rule names containing interpolation
      if (atRule.contains('interpolation') ) {
        return false;
      }

      const ruleName = atRule.first('ident') && atRule.first('ident').content;

      if (ruleName[0] !== '-') {
        return false;
      }

      if (!includes.test(ruleName) && (!autoprefixer.atRuleName(ruleName) || excludes.test(ruleName))) {
        // at rule name is correctly prefixed - not specifically requested, is not prefixable or excluded
        return false;
      }
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': atRule.start.line,
        'column': atRule.start.column,
        'message': `At rule ${ruleName} should not be vendor prefixed`,
        'severity': parser.severity
      });
    });
    return result;
  }
};
