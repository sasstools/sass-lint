'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'duplicate-property',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('block', function (block) {
      var properties = [],
          items = [];

      block.eachFor('declaration', function (declaration) {
        items.push(declaration);
      });

      items.reverse();

      items.forEach(function (declaration) {
        declaration.eachFor('property', function (item) {
          var property = item.content[0].content;

          if (properties.indexOf(property) === -1) {
            properties.push(property);
          }
          else {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': item.start.line,
              'column': item.start.column,
              'message': 'Duplicate properties are not allowed within a block.',
              'severity': parser.severity
            });
          }
        });
      });
    });

    return result;
  }
};
