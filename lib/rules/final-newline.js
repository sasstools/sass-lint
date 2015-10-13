'use strict';

var helpers = require('../helpers');

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

    if (ast.syntax === 'sass') {
      if (typeof last.last('block') === 'object') {
        var lastBlock = last.last('block');

        if (lastBlock.content.length > 0) {
          if (lastBlock.content[lastBlock.length - 1]) {
            last = lastBlock.content[lastBlock.length - 1];
          }
        }
      }
    }

    if (!last.is('space') && !last.is('declarationDelimiter')) {
      if (parser.options.include) {
        error.line = last.end.line;
        error.column = last.end.column;
        error.message = 'Files must end with a new line';
        result = helpers.addUnique(result, error);
      }
    }
    else if ((last.is('space') || last.is('declarationDelimiter'))) {
      if (!helpers.hasEOL(last.content) && parser.options.include) {
        error.line = last.start.line;
        error.column = last.start.column;
        error.message = 'Files must end with a new line';
        result = helpers.addUnique(result, error);
      }
      else if (helpers.hasEOL(last.content) && !parser.options.include) {
        error.line = last.start.line;
        error.column = last.start.column;
        error.message = 'Files must not end with a new line';
        result = helpers.addUnique(result, error);
      }
    }

    return result;
  }
};
