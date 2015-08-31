'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'space-after-bang',
  'defaults': {
    'include': false
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['important', 'default'], function (block) {
      block.traverse(function (item) {
        if (item.type === 'space') {
          if (parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': block.start.line,
              'column': block.start.column + 1,
              'message': 'Bangs (!) should be followed by a space',
              'severity': parser.severity
            });
          }
          else {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': block.start.line,
              'column': block.start.column,
              'message': 'Bangs (!) should not be followed by a space',
              'severity': parser.severity
            });
          }
        }
      });
    });

    return result;
  }
};
