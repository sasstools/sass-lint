'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'extends-before-declarations',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [],
        error;

    ast.traverseByType('block', function (block) {
      var lastDeclaration = null;

      block.forEach(function (item, j) {
        if (item.type === 'include' || item.type === 'extend') {
          if (item.first('atkeyword').first('ident').content === 'extend') {
            if (j > lastDeclaration && lastDeclaration !== null) {
              item.forEach('simpleSelector', function () {
                error = {
                  'ruleId': parser.rule.name,
                  'line': item.start.line,
                  'column': item.start.column,
                  'message': 'Extends should come before declarations',
                  'severity': parser.severity
                };
                result = helpers.addUnique(result, error);
              });
            }
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
