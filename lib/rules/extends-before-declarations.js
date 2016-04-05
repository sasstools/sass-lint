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
        // TODO: Remove tempory fix - atrule type is work around for issue:
        // https://github.com/tonyganch/gonzales-pe/issues/147
        if ((item.is('include') || item.is('extend') || item.is('atrule')) &&
            item.first('atkeyword')) {
          if (item.first('atkeyword').first('ident').content === 'extend') {
            if (j > lastDeclaration && lastDeclaration !== null) {
              error = {
                'ruleId': parser.rule.name,
                'line': item.start.line,
                'column': item.start.column,
                'message': 'Extends should come before declarations',
                'severity': parser.severity
              };
              result = helpers.addUnique(result, error);
            }
          }
        }

        if (item.is('declaration')) {
          lastDeclaration = j;
        }
      });
      lastDeclaration = null;
    });

    return result;
  }
};
