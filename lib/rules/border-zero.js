'use strict';

var helpers = require('../helpers');

var borders = ['border', 'border-top', 'border-right', 'border-bottom', 'border-left'];

var traverse = function (ast, parser, callback) {
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
              callback(node);
            }
          }
        }
      }
    });
  });
}
module.exports = {
  'name': 'border-zero',
  'defaults': {
    'convention': '0'
  },
  'detect': function (ast, parser) {
    var result = [];
    traverse(ast, parser, function (node) {
      if (parser.options.convention !== node.content) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'A value of `' + node.content + '` is not allowed. `' + parser.options.convention + '` must be used.',
          'severity': parser.severity
        });
      }
    })
    return result;
  }
};

module.exports.fix = function (ast, parser) {
  traverse(ast, parser, function (node) {
    node.content = parser.options.convention;
  })
}
