'use strict';

var helpers = require('../helpers');
var lengths = {
  short: 3,
  long: 6
};

module.exports = {
  'name': 'hex-length',
  'defaults': {
    'style': 'short'
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('color', function (value) {
      if (parser.options.style === 'short') {
        if (value.content.length !== lengths.short) {
          if (value.content.substr(0, 3) === value.content.substr(3, 5)) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': value.start.line,
              'column': value.start.column,
              'message': 'hex values should use the shorthand format - 3 characters where possible',
              'severity': parser.severity
            });
          }
        }
      }
      else if (parser.options.style === 'long') {
        if (value.content.length !== lengths.long) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': value.start.line,
            'column': value.start.column,
            'message': 'hex values should use the long-form format - 6 characters',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};
