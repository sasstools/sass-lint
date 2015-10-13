'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-duplicate-properties',
  'defaults': {
    'exclude': []
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('block', function (block) {
      var properties = [],
          items = [],
          warnMessage = false;

      block.eachFor('declaration', function (declaration) {
        items.push(declaration);
      });

      items.reverse();

      items.forEach(function (declaration) {
        warnMessage = false;

        declaration.eachFor('property', function (item) {
          var property = item.content[0].content;

          if (properties.indexOf(property) !== -1 && properties.length >= 1) {
            if (parser.options.exclude.indexOf(property) !== -1 && properties[properties.length - 1] !== property) {
              warnMessage = 'Excluded duplicate properties must directly follow each other.';
            }
            else if (parser.options.exclude.indexOf(property) === -1) {
              warnMessage = 'Duplicate properties are not allowed within a block';
            }
          }

          properties.push(property);

          if (warnMessage) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': item.start.line,
              'column': item.start.column,
              'message': warnMessage,
              'severity': parser.severity
            });
          }
        });
      });
    });

    return result;
  }
};
