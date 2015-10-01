'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'single-line-per-selector',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('selector', function (selector) {
      selector.forEach('delimiter', function (delimiter, i) {
        var next = selector.content[i + 1];

        if (next) {
          if (next.is('simpleSelector')) {
            next = next.content[0];
          }

          if (!(next.is('space') && helpers.hasEOL(next.content))) {
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
