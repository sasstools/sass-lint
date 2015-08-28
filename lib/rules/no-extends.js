'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../helpers');

module.exports = {
  'name': 'no-extends',
  'defaults': {},
  'detect': function(ast, parser) {
    var result = [];

    ast.traverseByType('extend', function(item) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': item.start.line,
        'column': item.start.column,
        'message': '@extend not allowed',
        'severity': parser.severity
      });
    });

    return result;
  }
}
