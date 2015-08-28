'use strict';

var getLastWhitespace = function (node) {
  if (typeof node !== 'object') {
    return false;
  }
  if (node.is('space')) {
    return node;
  }

  return getLastWhitespace(node.last());
};

module.exports = {
  'name': 'space-before-brace',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['block', 'atrulers'], function (block, i, parent) {
      var previous = parent.get(i - 1),
          whitespace = getLastWhitespace(previous);

      if (whitespace === false) {
        if (parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column - 1,
            'message': 'Whitespace required before {',
            'severity': parser.severity
          });
        }
      }
      else {
        if (!parser.options.include) {
          result.push({
            'ruleId': parser.rule.name,
            'line': whitespace.start.line,
            'column': whitespace.start.column,
            'message': 'Whitespace not allowed before {',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};
