'use strict';

var gonzales = require('gonzales-pe'),
    merge = require('merge');

module.exports = {
  'name': 'space-after-colon',
  'defaults': {
    'include': true
  },
  'detect': function (node, parser) {
    var result = [];

    if (node.type !== 'declaration') {
      return result;
    }

    node.forEach('propertyDelimiter', function (delimiter, i, parent) {
      var next = parent.content[i + 1];

      if (next.is('space')) {
        if (!parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': next.start.line,
            'column': next.start.column,
            'message': 'No space allowed after `:`',
            'severity': parser.severity
          });
        }
      }
      else {
        if (parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': delimiter.start.line,
            'column': delimiter.start.column,
            'message': 'Space expected after `:`',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
}