'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../helpers');

module.exports = {
  'name': 'leading-zero',
  'defaults': {
    'include': false
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('number', function (num, i, parent) {
      if (num.content.match(/^[0]([0-9]|.[0-9])/)) {
      	if (!parser.options.include) {
      	  result.push({
      	    'ruleId': parser.rule.name,
      	    'line': num.start.line,
      	    'column': num.start.column,
      	    'message': 'Don\'t include leading zeros on numbers',
      	    'severity': parser.severity
      	  });
      	}
      }
      else if (parser.options.include) {
      	result.push({
      	  'ruleId': parser.rule.name,
      	  'line': num.start.line,
      	  'column': num.start.column - 1,
      	  'message': 'Include leading zeros on numbers',
      	  'severity': parser.severity
      	});
      }
    });

    return result;
  }
}