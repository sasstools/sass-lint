'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-qualifying-elements',
  'defaults': {
    'allow-element-with-attribute': false,
    'allow-element-with-class': false,
    'allow-element-with-id': false
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('simpleSelector', function (selectors) {

      selectors.content.forEach(function (item, i) {
        if (item.is('class') || item.is('attribute') || item.is('id')) {
          var previous = selectors.content[i - 1] || false;

          if (previous && previous.is('ident')) {
            if (!parser.options['allow-element-with-' + item.type]) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': item.start.line,
                'column': item.start.column,
                'message': 'Qualifying elements are not allowed for ' + item.type + ' selectors',
                'severity': parser.severity
              });
            }
          }
        }
      });
    });

    return result;
  }
};
