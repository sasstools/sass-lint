'use strict';

var helpers = require('../helpers');

/**
 * Traverses a ruleset node for declarations and rulesets.
 * Counts the properties per nest depth and handles the parser options
 * for excluding nested values. Also used to skip over rulesets in the main rule
 * if they've already been parsed here.
 * @param {object} node - the current ruleset node
 * @param {bool} includeNested - user defined option on whether to parse nested blocks
 * @returns {array} the property count and the number of child rulesets parsed
 */
var countProps = function (node, includeNested) {
  var propertyCount = 0,
      nestCount = 1;

  if (node.contains('block')) {
    node.forEach('block', function (block) {
      block.forEach('declaration', function (declaration) {
        if (declaration.contains('property')) {
          propertyCount++;
        }
      });
      if (includeNested && block.contains('ruleset')) {
        block.forEach('ruleset', function (childRule) {
          var outcome = countProps(childRule, true);
          propertyCount += outcome[0];
          nestCount += outcome[1];
        });
      }
    });
  }

  return [propertyCount, nestCount];
};

module.exports = {
  'name': 'property-count',
  'defaults': {
    'max-properties': 0,
    'include-nested': false
  },
  'detect': function (ast, parser) {
    var result = [],
        propCount = 0,
        nestedRules = 1,
        outcome,
        errProps,
        propSuffix;

    ast.traverseByType('ruleset', function (ruleset) {
      var errMessage = 'Rule set contains ';

      if (nestedRules > 1) {
        nestedRules--;

        return false;
      }

      outcome = countProps(ruleset, parser.options['include-nested']);
      propCount = outcome[0];
      nestedRules = outcome[1];

      if (parser.options['max-properties'] >= 1 && propCount > parser.options['max-properties']) {
        errProps = parseInt(propCount - parser.options['max-properties'], 10);
        propSuffix = errProps === 1 ? 'property' : 'properties';
        errMessage += errProps + ' ' + propSuffix;
        errMessage += ' more than the specified maximum of ' + parser.options['max-properties'];
        errMessage += parser.options['include-nested'] ? '(includes properties in nested rules)' : '';

        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': ruleset.start.line,
          'column': ruleset.start.column,
          'message': errMessage,
          'severity': parser.severity
        });
      }
    });
    return result;
  }
};
