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
  'name': 'no-property-vendor-prefix',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': [],
  },
  'detect': function (ast, parser) {
    let result = [];
    const includes = precompileRegEx(parser.options['additional-identifiers']);
    const excludes = precompileRegEx(parser.options['excluded-identifiers']);

    ast.traverseByType('property', (prop) => { // eslint-disable-line consistent-return
      // check and ignore properties containing interpolation
      if (prop.contains('interpolation') ) {
        return false;
      }

      const propName = prop.first('ident') && prop.first('ident').content;
      if (propName) {
        if (propName[0] !== '-') {
          return false;
        }

        if (!includes.test(propName) && (!autoprefixer.property(propName) || excludes.test(propName))) {
          // Property is correctly prefixed - not specifically requested, is not prefixable or excluded
          return false;
        }

        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': prop.start.line,
          'column': prop.start.column,
          'message': `Property ${propName} should not be vendor prefixed`,
          'severity': parser.severity
        });
      }
    });
    return result;
  }
};
