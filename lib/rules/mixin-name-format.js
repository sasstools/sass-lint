// Note that this file is nearly identical to function-name-format.js, variable-name-format.js, and placeholder-name-format.js
'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'mixin-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase'
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['mixin', 'include'], function (node) {
      var name;

      if (node.type === 'mixin') {
        name = node.first('ident').content;
      }
      else {
        name = node.first('simpleSelector').first('ident').content;
      }

      var originalName = name;

      if (parser.options['allow-leading-underscore'] && name[0] === '_') {
        name = name.slice(1);
      }

      if (parser.options.convention === 'hyphenatedlowercase' && !helpers.isHyphenatedLowercase(name)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Mixin \'' + originalName + '\' should be written in lowercase with hyphens',
          'severity': parser.severity
        });
      }
      else if (parser.options.convention === 'camelcase' && !helpers.isCamelCase(name)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Mixin \'' + originalName + '\' should be written in camelCase',
          'severity': parser.severity
        });
      }
      else if (parser.options.convention === 'snakecase' && !helpers.isSnakeCase(name)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Mixin \'' + originalName + '\' should be written in snake_case',
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
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Mixin \'' + originalName + '\' ' + message,
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};
