'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-invalid-whitespace',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];
    var invalidWS = new RegExp(String.fromCharCode(160), 'g');

    ast.traverse(function (node) {
      if (node.type === 'selector' || node.type === 'class') {
        var content = node.content;
        if (invalidWS.test(content)) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'severity': parser.severity,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Found invalid whitespace'
          });
        }
      }
    });

    return result;
  }
};
