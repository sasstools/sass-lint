'use strict';

var helpers = require('../helpers');
var lengths = {
  short: 3,
  long: 6
};

var canShorten = function (hex) {
  return hex.length === lengths.long &&
          hex[0] === hex[1] &&
          hex[2] === hex[3] &&
          hex[4] === hex[5];
};

var traverse = function (ast, callback) {
  ast.traverseByType('color', function (node) {
    return callback(node);
  });
};

module.exports = {
  'name': 'hex-length',
  'defaults': {
    'style': 'short'
  },
  'detect': function (ast, parser) {
    var result = [];
    traverse(ast, function (node) {
      if (parser.options.style === 'short' && canShorten(node.content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Hex values should use the shorthand format - 3 characters where possible',
          'severity': parser.severity
        });
      }
      else if (parser.options.style === 'long') {
        if (node.content.length !== lengths.long) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Hex values should use the long-form format - 6 characters',
            'severity': parser.severity
          });
        }
      }
    });
    return result;
  }
};

module.exports.fix = function (ast, parser) {
  traverse(ast, function (node) {
    if (parser.options.style === 'short' && canShorten(node.content)) {
      node.content = [0, 2, 4].reduce(function (e, r) {
        return e + node.content[r];
      }, '');
    }
  });
};
