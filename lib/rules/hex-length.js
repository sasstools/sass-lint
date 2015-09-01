'use strict';

var helpers = require('../helpers');
var lengths = {
  short: 3,
  long: 6
};

module.exports = {
  'name': 'hex-length',
  'defaults': {
    'style': 'short'
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('color', function (content) {
      if (content.length !== lengths[parser.options.style]) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': content.start.line,
          'column': content.start.column,
          'message': 'hex length rawwr',
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};
