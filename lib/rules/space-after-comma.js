'use strict';

var gonzales = require('gonzales-pe'),
    util = require('util'),
    merge = require('merge');

module.exports = {
  'name': 'space-after-colon',
  'defaults': {
    'include': true
  },
  'detect': function (node, parser) {
    var result = [],
        determineResult;

    if (node.type !== 'declaration') {
      return result;
    }

    determineResult = function (next, operator) {
      if (next.is('space')) {
        if (!parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': next.start.line,
            'column': next.start.column,
            'message': 'Commas should not be followed by a space',
            'severity': parser.severity
          });
        }
      }
      else {
        if (parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': operator.start.line,
            'column': operator.start.column,
            'message': 'Commas should be followed by a space',
            'severity': parser.severity
          });
        }
      }
    }

    node.forEach('value', function (value, i, parent) {
      value.forEach('operator', function (operator, j) {
        var next = value.content[j + 1];

        determineResult(next, operator);
      });
    });

    return result;
  }
}