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
  'name': 'no-value-vendor-prefix',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': [],
  },
  'detect': function (ast, parser) {
    let result = [];
    const includes = precompileRegEx(parser.options['additional-identifiers']);
    const excludes = precompileRegEx(parser.options['excluded-identifiers']);

    ast.traverseByType('declaration', (decl) => { // eslint-disable-line consistent-return
      if (decl.contains('interpolation')) {
        return false;
      }
      const property = decl.first('property');
      const propName = property.first('ident') && property.first('ident').content;
      const val = decl.first('value');
      if (propName && val) {
        val.traverseByType('ident', (ident, i, parent) => { // eslint-disable-line consistent-return
          if (parent.is('variable') || parent.is('customProperty') || ident.content[0] !== '-') {
            return false;
          }

          const valName = ident.content;
          if (!includes.test(valName) && (!autoprefixer.propertyValue(propName, valName) || excludes.test(valName))) {
            // value is correctly prefixed - not specifically requested, is not prefixable or excluded
            return false;
          }

          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': ident.start.line,
            'column': ident.start.column,
            'message': `Value ${valName} should not be vendor prefixed`,
            'severity': parser.severity
          });
        });
      }
    });
    return result;
  }
};
