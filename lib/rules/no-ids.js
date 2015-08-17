'use strict';

var gonzales = require('gonzales-pe'),
    util = require('util'),
    merge = require('merge');

function log (input) {
  console.log(util.inspect(input, false, null));
}

module.exports = {
  'name': 'no-ids',
  'defaults': {},
  'detect': function (node, parser) {
    var result = [];

    node.traverseByType('id', function (id, i, parent) {
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