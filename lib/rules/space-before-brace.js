'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../rule-helpers');

var getLastWhitespace = function (node) {
  if (typeof node !== 'object') {
    return;
  }
  if (node.is('space')) {
    return node;
  }

  return getLastWhitespace(node.last());
}

module.exports = {
  'name': 'space-before-brace',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [],
        value = this.value;

    ast.traverseByTypes(['block', 'atrulers'], function (block, i, parent) {
      var previous = parent.get(i - 1),
          whitespace = getLastWhitespace(previous);

      if (typeof whitespace === 'undefined') {
        if (parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column - 1,
            'message': 'Whitespace required before {',
            'severity': parser.severity
          });
        }
      }
      else {
        if (!parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': whitespace.start.line,
            'column': whitespace.start.column,
            'message': 'Whitespace not allowed before {',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
}