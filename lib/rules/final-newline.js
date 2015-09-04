'use strict';

var helpers = require('../helpers'),
    os = require('os');

module.exports = {
  'name': 'final-newline',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [],
        last = ast.content[ast.content.length - 1],
        error = {
          'ruleId': parser.rule.name,
          'severity': parser.severity
        };

    if (last.type !== 'space') {
      if (parser.options.include) {
        error.line = last.end.line;
        error.column = last.end.column;
        error.message = 'Files must end with a new line';
        result = helpers.addUnique(result, error);
      }
    }
    else {
      if (last.content !== os.EOL && parser.options.include) {
        error.line = last.start.line;
        error.column = last.start.column;
        error.message = 'Files must end with a new line';
        result = helpers.addUnique(result, error);
      }
      else if (last.content === os.EOL && !parser.options.include) {
        error.line = last.start.line;
        error.column = last.start.column;
        error.message = 'Files must not end with a new line';
        result = helpers.addUnique(result, error);
      }
    }

    return result;
  }
};
