'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-multiple-empty-lines',
  'defaults': {
  },
  'detect': function (ast, parser) {
    let result = [];

    const source = ast.toString();
    const re = /^\n\n+/gm;
    let m = null;
    do {
      m = re.exec(source);
      if (m) {
        const lineNumber = source
          .substr(0, m.index)
          .split('\n').length;

        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': lineNumber,
          'column': 1,
          'message': 'Multiple consecutive empty lines not allowed',
          'severity': parser.severity
        });
      }
    } while (m);

    return result;
  }
};
