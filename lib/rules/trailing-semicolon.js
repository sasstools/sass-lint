'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../rule-helpers');

module.exports = {
  'name': 'trailing-semicolon',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    if (ast.syntax !== 'sass') {
      ast.traverseByType('block', function (block) {
        var last = block.last('declaration'),
            next;

        block.forEach('declaration', function (item, i, parent) {
          if (helpers.isEqual(last, item)) {
            next = parent.content[i + 1];

            if (next.type === 'declarationDelimiter') {
              if (!parser.options.include) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'severity': parser.severity,
                  'line': item.end.line,
                  'column': item.end.column,
                  'message': 'No trailing semicolons allowed'
                });
              }
            }
            else {
              if (parser.options.include) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'severity': parser.severity,
                  'line': item.last('value').start.line,
                  'column': item.last('value').start.column,
                  'message': 'Trailing semicolons required'
                });
              }
            }
          }

        });
      });
    }


    return result;
  }
}