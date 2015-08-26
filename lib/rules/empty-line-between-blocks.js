'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../rule-helpers');

module.exports = {
  'name': 'empty-line-between-blocks',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [],
        value = this.value;

    ast.traverseByType('ruleset', function (ruleset, i, parent) {
      var previous,
          space;

      if (parent.type === 'block') {
        previous = parent.content[i - 1];

        space = previous.content.indexOf('\n\n') >= 0;

        if (parser.options.include && !space) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': previous.end.line,
            'column': previous.end.column ,
            'message': 'Space expected between blocks',
            'severity': parser.severity
          });
        }
        else if (!parser.options.include && space) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': previous.end.line,
            'column': previous.end.column ,
            'message': 'Space not allowed between blocks',
            'severity': parser.severity
          });
        }


      }
    });

    return result;
  }
}