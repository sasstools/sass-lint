'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-universal-selector',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('typeSelector', function (typeSelector) {
      typeSelector.traverse(function (item) {
        if (item.is('ident') && item.content === '*') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': '* (universal selector) not allowed',
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};
