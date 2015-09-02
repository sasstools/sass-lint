'use strict';

var helpers = require('../helpers');

var borders = ['border', 'border-top', 'border-right', 'border-bottom', 'border-left'];

module.exports = {
  'name': 'border-zero',
  'defaults': {
    'convention': '0'
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('declaration', function (declaration) {
      var isBorder = false;

      declaration.traverse(function (item) {
        if (item.type === 'property') {
          item.traverse(function (child) {
            if (borders.indexOf(child.content) !== -1) {
              isBorder = true;
            }
          });
        }

        if (isBorder) {
          if (item.type === 'value') {
            var node = item.content[0];
            if (node.type === 'number' || node.type === 'ident') {
              if (node.content === '0' || node.content === 'none') {
                if (parser.options.convention !== node.content) {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': node.start.line,
                    'column': node.start.column,
                    'message': 'A value of `' + node.content + '` is not allowed. `' + parser.options.convention + '` must be used.',
                    'severity': parser.severity
                  });
                }
              }
            }
          }
        }
      });
    });

    return result;
  }
};
