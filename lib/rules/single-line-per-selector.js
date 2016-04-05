'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'single-line-per-selector',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('ruleset', function (ruleset) {
      ruleset.forEach('delimiter', function (delimiter, j) {
        var next = ruleset.content[j + 1] || false;

        if (next) {
          if (next.is('selector')) {
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
