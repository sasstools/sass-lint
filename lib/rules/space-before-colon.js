'use strict';

var gonzales = require('gonzales-pe');

module.exports = {
  'name': 'space-before-colon',
  'process': function (node) {
    // var value = this.getValue('space-before-colon'),
    //     syntax = this.getSyntax();

    // if (!node.is('declaration')) {
    //   return;
    // }

    // node.forEach()
    return 1;
  },
  'detect': function (node, parser) {
    var result = [];

    node.traverseByType('propertyDelimiter', function (delimiter, i, parent) {
      var previous = parent.content[i - 1];

      if (previous.is('space')) {
	if (!parser.options.include) {
	  result.push({
	    'rule': parser.rule.name,
	    'line': previous.start,
	    'severity': parser.severity
	  });
	}
      }
    });

    return result;
  }
}