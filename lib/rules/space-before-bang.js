'use strict';

var helpers = require('../helpers.js');

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
  'name': 'space-before-bang',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['important'], function (block, i, parent) {
      var previous = parent.get(i - 1),
          whitespace = getLastWhitespace(previous);

      if (whitespace === false) {
        if (parser.options.include) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column - 1,
            'message': 'Whitespace required before !important',
            'severity': parser.severity
          });
        }
      }
      else {
        if (!parser.options.include) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': whitespace.start.line,
            'column': whitespace.start.column,
            'message': 'Whitespace not allowed before !important',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};
