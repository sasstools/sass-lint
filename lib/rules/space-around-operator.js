'use strict';

var helpers = require('../helpers');

var validateExpression = function (parser, result, expressionNode) {
  if (!expressionNode) {
    return;
  }

  for (var j = 0; j < expressionNode.content.length; j += 2) {
    // every second node should be a single space
    var node = expressionNode.content[j + 1];
    if (node && !node.is('space')) {
      helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': node.start.line,
        'column': node.start.column,
        'message': 'Value should be followed by a space',
        'severity': parser.severity
      });
      break;
    }
    else if (node && node.is('space') && node.content !== ' ') {
      helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': node.start.line,
        'column': node.start.column,
        'message': 'Value should be followed by a single space',
        'severity': parser.severity
      });
      break;
    }
  }
};

module.exports = {
  'name': 'space-around-operator',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('atruleb', function (exp) {
      exp.content.forEach(function (node) {
        if (node.is('parentheses')) {
          validateExpression(parser, result, node);
        }
      });
    });

    ast.traverseByType('value', function (value) {
      value.content.forEach(function (node) {
        if (node.is('operator') || node.is('unaryOperator')) {
          validateExpression(parser, result, value);
          return false;
        }
      });
    });

    return result;
  }
};
