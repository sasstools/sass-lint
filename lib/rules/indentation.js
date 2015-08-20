'use strict';

var gonzales = require('gonzales-pe'),
    util = require('util'),
    merge = require('merge');

function log (input) {
  console.log(util.inspect(input, false, null));
}

module.exports = {
  'name': 'indentation',
  'defaults': {
    'size': 2,
    'type': 'space'
  },
  'detect': function (ast, parser) {
    var result = [],
	detect = {
	  'ruleId': parser.rule.name,
	  'severity': parser.severity
	},
	message = 'Expected indentation of {{needed}} ' +parser.options.type + 's but found {{gotten}}';

    ast.traverseByType('space', function (space, i, parent) {
      if (parser.options.type === 'space') {
	if (space.content.indexOf('\t') >= 0) {
	  result.push(merge(detect, {
	    'line': space.start.line,
	    'column': space.start.column,
	    'message': 'Use spaces instead of tabs'
	  }));
	}
	else if (space.content.indexOf(' ') >= 0) {
	  log(parent);
	}
      }
    });

    return result;
  }
}