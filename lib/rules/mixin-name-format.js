// Note that this file is nearly identical to function-name-format.js, variable-name-format.js, and placeholder-name-format.js
'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'mixin-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['mixin', 'include'], function (node) {
      var name,
          strippedName,
          violationMessage = false;

      if (node.type === 'mixin') {
        name = node.first('ident').content;
      }
      else {
        name = node.first('simpleSelector').first('ident').content;
      }

      strippedName = name;

      if (parser.options['allow-leading-underscore'] && name[0] === '_') {
        strippedName = name.slice(1);
      }

      switch (parser.options.convention) {
      case 'hyphenatedlowercase':
        if (!helpers.isHyphenatedLowercase(strippedName)) {
          violationMessage = 'Mixin \'' + name + '\' should be written in lowercase with hyphens';
        }
        break;
      case 'camelcase':
        if (!helpers.isCamelCase(strippedName)) {
          violationMessage = 'Mixin \'' + name + '\' should be written in camelCase';
        }
        break;
      case 'snakecase':
        if (!helpers.isSnakeCase(strippedName)) {
          violationMessage = 'Mixin \'' + name + '\' should be written in snake_case';
        }
        break;
      default:
        if (!(new RegExp(parser.options.convention).test(strippedName))) {
          violationMessage = 'Mixin \'' + name + '\' should match regular expression /' + parser.options.convention + '/';

          // convention-message overrides violationMessage
          if (parser.options['convention-explanation']) {
            violationMessage = parser.options['convention-explanation'];
          }
        }
      }

      if (violationMessage) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': violationMessage,
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};
