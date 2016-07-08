'use strict';

var helpers = require('../helpers');

var traverse = function (ast, callback) {
  ast.traverseByTypes(['propertyDelimiter', 'operator'], function (delimiter, i, parent) {
    return callback(delimiter, i, parent);
  });
};

module.exports = {
  'name': 'space-after-colon',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];
    traverse(ast, function (delimiter, i, parent) {
      if (delimiter.content === ':') {

        var next = parent.content[i + 1];

        if (next && next.is('space')) {
          if (!parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': next.start.line,
              'column': next.start.column,
              'message': 'No space allowed after `:`',
              'severity': parser.severity
            });
          }
        }
        else {
          if (parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': delimiter.start.line,
              'column': delimiter.start.column,
              'message': 'Space expected after `:`',
              'severity': parser.severity
            });
          }
        }
      }
    });
    return result;
  }
};

module.exports.fix = function (ast, parser) {
  traverse(ast, function (delimiter, i, parent) {
    if (delimiter.content === ':') {
      var next = parent.content[i + 1];
      var include = parser.options.include;
      if (next && next.is('space')) {
        if (!include) {
          parent.content = parent.content.splice(i + 1, 1);
        }
      }
      else if (parser.options.include) {
        delimiter.content += ' ';
      }
    }
  });
};
