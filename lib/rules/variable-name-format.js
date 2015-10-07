'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'variable-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase'
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('variable', function (variable) {
      var name = variable.first().content;

      if (parser.options['allow-leading-underscore'] && name[0] === '_') {
        name = name.slice(1);
      }

      if (parser.options.convention === 'hyphenatedlowercase' && !helpers.isHyphenatedLowercase(name)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': variable.start.line,
          'column': variable.start.column,
          'message': 'Variable \'' + variable.first().content + '\' should be written in lowercase with hyphens',
          'severity': parser.severity
        });
      }
      else if (parser.options.convention === 'camelcase' && !helpers.isCamelCase(name)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': variable.start.line,
          'column': variable.start.column,
          'message': 'Variable \'' + variable.first().content + '\' should be written in camelCase',
          'severity': parser.severity
        });
      }
      else if (parser.options.convention === 'snakecase' && !helpers.isSnakeCase(name)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': variable.start.line,
          'column': variable.start.column,
          'message': 'Variable \'' + variable.first().content + '\' should be written in snake_case',
          'severity': parser.severity
        });
      }
      else if (parser.options.convention instanceof RegExp && !parser.options.convention.test(name)) {
        var message = parser.options['convention-explanation'];

        if (!message) {
          message = 'should match regular expression /' + parser.options.convention.source + '/' +
                    (parser.options.convention.ignoreCase ? 'i' : '');
        }

        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': variable.start.line,
          'column': variable.start.column,
          'message': 'Variable \'' + variable.first().content + '\' ' + message,
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};
