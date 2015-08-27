'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../helpers');
module.exports = {
  'name': 'no-ids',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('id', function (id, i, parent) {
      result.push({
      	'ruleId': parser.rule.name,
      	'line': id.start.line,
      	'column': id.start.column,
      	'message': 'ID selectors not allowed',
      	'severity': parser.severity
      });
    });

    return result;
  }
}