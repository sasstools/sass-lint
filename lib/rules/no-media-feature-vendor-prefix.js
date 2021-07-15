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
  'name': 'no-media-feature-vendor-prefix',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': [],
  },
  'detect': function (ast, parser) {
    let result = [];
    const includes = precompileRegEx(parser.options['additional-identifiers']);
    const excludes = precompileRegEx(parser.options['excluded-identifiers']);

    ast.traverseByType('parentheses', (parentheses, index, parent) => { // eslint-disable-line consistent-return
      // check and ignore media features containing interpolation
      if (parentheses.contains('interpolation') ) {
        return false;
      }

      const parentIdent = parent &&
        parent.is('atrule') &&
        parent.first('atkeyword') &&
        parent.first('atkeyword').first('ident');

      if (parentIdent && parentIdent.content !== 'media') {
        return false;
      }

      const feature = parentheses.first('ident');
      const featureName = feature && parentheses.first('ident').content;

      if (!featureName || !includes.test(featureName) && (!autoprefixer.mediaFeature(featureName) || excludes.test(featureName))) {
        // media feature is correctly prefixed - not specifically requested, is not prefixable or excluded
        return false;
      }

      if (!featureName.match(/[a-z-]+device-pixel-ratio/gi) && !includes.test(featureName)) {
        return false;
      }

      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': feature.start.line,
        'column': feature.start.column,
        'message': `Media feature ${featureName} should not be vendor prefixed`,
        'severity': parser.severity
      });
    });
    return result;
  }
};
