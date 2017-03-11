'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'quotes',
  'defaults': {
    'style': 'single',
    'attribute': 'single'
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('string', function (node, index, parent) {
      var firstQuote = node.content.charAt(0),
          lastQuote = node.content.charAt(node.content.length - 1);

      if (firstQuote !== lastQuote) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Mixed quote styles',
          'severity': parser.severity
        });
      }

      var quotesStyle = (parent.type === 'attributeValue') ?
        parser.options.attribute :
        parser.options.style;

      if (quotesStyle === 'single' && firstQuote !== '\'') {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Strings must use single quotes',
          'severity': parser.severity
        });
      }
      else if (quotesStyle === 'double' && firstQuote !== '"') {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Strings must use double quotes',
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};
