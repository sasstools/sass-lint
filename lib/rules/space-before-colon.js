'use strict';

var helpers = require('../helpers');
var traverse = function (ast, callback) {
  ast.traverseByTypes(['propertyDelimiter', 'operator'], function (delimiter, i, parent) {
    return callback(delimiter, i, parent);
  });
};
module.exports = {
  'name': 'space-before-colon',
  'defaults': {
    'include': false
  },
  'detect': function (ast, parser) {
    var result = [];
    traverse(ast, function (delimiter, i, parent) {
      if (delimiter.content === ':') {
        var previous = parent.content[i - 1];

        if (previous && previous.is('space')) {
          if (!parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': previous.start.line,
              'column': previous.start.column,
              'message': 'No space allowed before `:`',
              'severity': parser.severity
            });
          }
        }
        else {
          if (parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': delimiter.start.line,
              'column': delimiter.start.column - 1,
              'message': 'Space expected before `:`',
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
  var include = parser.options.include;
  traverse(ast, function (delimiter, i, parent) {
    if (delimiter.content === ':') {
      var previous = parent.content[i - 1];
      if (previous.is('space')) {
        if (!include) { // no space allowed
          parent.content.splice(i - 1, 1);
        }
      }
      else if (include) {
        previous.content += ' ';
      }
    }
  });
};
