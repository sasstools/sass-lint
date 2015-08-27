'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../helpers');

module.exports = {
  'name': 'important',
  'defaults': {},
  'detect': function(ast, parser) {
    var result = [];

    ast.traverseByType('important', function(item) {
      result.push({
      	'ruleId': parser.rule.name,
      	'line': item.start.line,
      	'column': item.start.column,
      	'message': '!important not allowed',
      	'severity': parser.severity
      });
    });

    return result;
  }
};
