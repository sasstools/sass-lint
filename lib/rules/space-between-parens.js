'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'space-between-parens',
  'defaults': {
    'include': false
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('arguments', function (args) {
      var first = args.first(),
          last = args.last();

      if (args.length === 0) {
        return;
      }

      if (parser.options.include) {
        if (first.type !== 'space') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': first.start.line,
            'column': first.start.column - 1,
            'message': 'Space expected at beginning of parenthesis',
            'severity': parser.severity
          });
        }
        if (last.type !== 'space') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': last.end.line,
            'column': last.end.column,
            'message': 'Space expected at end of parenthesis',
            'severity': parser.severity
          });
        }
      }
      else {
        if (first.type === 'space') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': first.start.line,
            'column': first.start.column,
            'message': 'No space allowed at beginning of parenthesis',
            'severity': parser.severity
          });
        }
        if (last.type === 'space') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': last.start.line,
            'column': last.start.column,
            'message': 'No space allowed at end of parenthesis',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};
