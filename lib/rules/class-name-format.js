// Note that this file is nearly identical to id-name-format.js and attribute-name-format.js
'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'class-name-format',
  'defaults': {
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false,
    'ignore': []
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('class', function (node) {
      var name = node.first().content,
          violationMessage = false;

      if (parser.options.ignore.indexOf(name) !== -1) {
        return;
      }

      switch (parser.options.convention) {
      case 'hyphenatedlowercase':
        if (!helpers.isHyphenatedLowercase(name)) {
          violationMessage = 'Class \'.' + name + '\' should be written in lowercase with hyphens';
        }
        break;
      case 'camelcase':
        if (!helpers.isCamelCase(name)) {
          violationMessage = 'Class \'.' + name + '\' should be written in camelCase';
        }
        break;
      case 'snakecase':
        if (!helpers.isSnakeCase(name)) {
          violationMessage = 'Class \'.' + name + '\' should be written in snake_case';
        }
        break;
      case 'strictbem':
        if (!helpers.isStrictBEM(name)) {
          violationMessage = 'Class \'.' + name + '\' should be written in BEM (Block Element Modifier) format';
        }
        break;
      case 'hyphenatedbem':
        if (!helpers.isHyphenatedBEM(name)) {
          violationMessage = 'Class \'.' + name + '\' should be written in hyphenated BEM (Block Element Modifier) format';
        }
        break;
      default:
        if (!(new RegExp(parser.options.convention).test(name))) {
          violationMessage = 'Class \'.' + name + '\' should match regular expression /' + parser.options.convention + '/';

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
