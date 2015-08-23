'use strict';

var gonzales = require('gonzales-pe'),
    util = require('util'),
    merge = require('merge');

function log (input) {
  console.log(util.inspect(input, false, null));
}

module.exports = {
  'name': 'mixins-before-declarations',
  'defaults': {
    'exclude': [
      'breakpoint',
      'mq'
    ]
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('block', function (block, i, parent) {
      var lastDeclaration = null;
      block.traverse(function (item, j) {
        if (item.type === 'include') {
          if (j > lastDeclaration && lastDeclaration !== null) {
            item.forEach('simpleSelector', function (name) {
              if (parser.options.exclude.indexOf(name.content[0].content) === -1) {
                result.push({
                  'ruleId': parser.rule.name,
                  'line': item.start.line,
                  'column': item.start.column,
                  'message': 'Mixins should come before declarations',
                  'severity': parser.severity
                });
              }
            });
          }
        }
        if (item.type === 'declaration') {
          lastDeclaration = j;
        }
      });
      lastDeclaration = null;
    });

    return result;
  }
}