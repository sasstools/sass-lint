'use strict';

var gonzales = require('gonzales-pe'),
    merge = require('merge');

module.exports = {
  'name': 'space-before-colon',
  'defaults': {
    'include': false
  },
  'detect': function (node, parser) {
    var result = [];

    if (node.type !== 'declaration') {
      return result;
    }


    node.forEach('propertyDelimiter', function (delimiter, i, parent) {
      var previous = parent.content[i - 1];

      if (previous.is('space')) {
        if (!parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': previous.start.line,
            'column': previous.start.column,
            'message': 'No space allowed before `:`',
            'severity': parser.severity
          });
        }
      }
      else {
        if (parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': delimiter.start.line,
            'column': delimiter.start.column - 1,
            'message': 'Space expected before `:`',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
}