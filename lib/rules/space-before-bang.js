'use strict';

var helpers = require('../helpers.js');

module.exports = {
  'name': 'space-before-bang',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['important', 'default'], function (block, i, parent) {
      var previous = parent.content[i - 1];

      if (!previous.is('space')) {
        if (parser.options.include) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column,
            'message': 'Whitespace required before !important',
            'severity': parser.severity
          });
        }
      }
      else {
        if (!parser.options.include) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': previous.start.line,
            'column': previous.start.column,
            'message': 'Whitespace not allowed before !important',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};
