'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-css-comments',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];
    var valid = false;

    ast.traverseByType('multilineComment', function (node) {
      if (parser.options.allowed) {
        parser.options.allowed.forEach(function (rule) {
          var rex = new RegExp(rule);
          if (node.content.match(rex)) {
            valid = true;
          }
        });
      }
      if (!valid) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Multiline style comments should not be used',
          'severity': parser.severity
        });
      }
      valid = false;
    });
    return result;
  }
};
