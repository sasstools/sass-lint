'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'extends-before-mixins',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('block', function (block) {
      var lastMixin = null;

      block.forEach(function (item, j) {
        if (item.type === 'include' || item.type === 'extend') {
          if (item.first('atkeyword')) {
            var atkeyword = item.first('atkeyword');

            if (atkeyword.first('ident')) {
              var ident = atkeyword.first('ident');

              if (ident.content === 'extend') {
                if (j > lastMixin && lastMixin !== null) {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': item.start.line,
                    'column': item.start.column,
                    'message': 'Extends should come before mixins',
                    'severity': parser.severity
                  });
                }
              }
            }
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
};
