'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../helpers');

module.exports = {
  'name': 'no-empty-rulesets',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [],
        last = ast.content[ast.content.length - 1];

    ast.traverseByType('block', function (block, i, parent) {
      var nonSpaceCount = 0,
          empty = false;

      if (block.content.length === 0) {
        empty = true;
      }
      else {
        block.traverse(function (item) {
          if (!helpers.isEqual(block, item)) {
            if (item.type !== 'space') {
              nonSpaceCount++;
            }
          }
        });
        if (nonSpaceCount === 0) {
          empty = true;
        }
      }

      if (empty) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'severity': parser.severity,
          'line': block.start.line,
          'column': block.start.column,
          'message': 'No empty blocks allowed'
        });
      }
    });


    return result;
  }
}
