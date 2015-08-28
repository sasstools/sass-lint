'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'mixins-before-declarations',
  'defaults': {
    'exclude': [
      'breakpoint',
      'mq'
    ]
  },
  'detect': function (ast, parser) {
    var result = [],
        error;

    ast.traverseByType('block', function (block) {
      var lastDeclaration = null;
      block.traverse(function (item, j) {
        if (item.type === 'include') {
          if (j > lastDeclaration && lastDeclaration !== null) {
            item.forEach('simpleSelector', function (name) {
              if (parser.options.exclude.indexOf(name.content[0].content) === -1) {
                error = {
                  'ruleId': parser.rule.name,
                  'line': item.start.line,
                  'column': item.start.column,
                  'message': 'Mixins should come before declarations',
                  'severity': parser.severity
                };
                result = helpers.addUnique(result, error);
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
};
