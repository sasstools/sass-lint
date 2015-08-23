'use strict';

var gonzales = require('gonzales-pe'),
    util = require('util'),
    merge = require('merge');

function log (input) {
  console.log(util.inspect(input, false, null));
}

module.exports = {
  'name': 'extends-before-mixins',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('block', function (block, i, parent) {
      var lastMixin = null;
      block.traverse(function (item, j) {
        // console.log(item.type);
        if (item.type === 'extend') {
          if (j > lastMixin && lastMixin !== null) {
            result.push({
              'ruleId': parser.rule.name,
              'line': item.start.line,
              'column': item.start.column,
              'message': 'Extends should come before mixins',
              'severity': parser.severity
            });
          }
        }
        if (item.type === 'include') {
          lastMixin = j;
        }
      });
      lastMixin = null;
    });

    return result;
  }
}