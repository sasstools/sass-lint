'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'calc-without-interpolation',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('function', function (node) {
      if (node.content[0].content === 'calc') {
        var isVariable = function (argument) {
          return argument.type === 'variable';
        };
        var hasNonInterpolated = node.content[1].content.some(isVariable);

        if (hasNonInterpolated) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Calc expression \'' + node.content + '\' will be calculated at compile time. Use interpolation ( #{$var} ) to calculate it in the browser.',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};

