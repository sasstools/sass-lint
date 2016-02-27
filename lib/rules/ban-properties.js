'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'ban-properties',
  'defaults': {
    'properties': []
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('property', function (node) {
      if (node.first().is('ident')) {
        var curProperty = node.first().content;

        if (parser.options.properties.indexOf(curProperty) !== -1) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Property `' + curProperty + '` should not be used',
            'severity': parser.severity
          });
        }
      }
    });
    return result;
  }
};
