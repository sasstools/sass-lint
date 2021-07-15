'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-disallowed-property-values',
  'defaults': {
    'properties': {}
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('value', function (valueNode, idx, parent) {
      var propertyNode = parent.first('property');
      if (!propertyNode) {
        return;
      }
      var propertyNameNode = propertyNode.first();
      if (!propertyNameNode.is('ident')) {
        return;
      }
      var propertyName = propertyNameNode.content;
      var disallowedPropertyValues = parser.options.properties[propertyName];
      if (!disallowedPropertyValues) {
        return;
      }
      if (typeof disallowedPropertyValues === 'string') {
        disallowedPropertyValues = [disallowedPropertyValues];
      }
      valueNode.forEach('ident', function (node) {
        if (disallowedPropertyValues.indexOf(node.content) === -1) {
          return;
        }
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Property `' + propertyName + '` should not have value `' + node.content + '`',
          'severity': parser.severity
        });
      });
    });
    return result;
  }
};
