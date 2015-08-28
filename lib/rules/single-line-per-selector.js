'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'single-line-per-selector',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('selector', function (selector) {
      selector.forEach('delimiter', function (del, i) {
        var next = selector.content[i + 1].content[0];

        if (next) {
          if (next.type !== 'space' || next.content.indexOf('\n') === -1) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': next.start.line,
              'column': next.start.column,
              'message': 'Selectors must be placed on new lines',
              'severity': parser.severity
            });
          }
        }
      });
    });

    return result;
  }
};
