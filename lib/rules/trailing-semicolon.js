'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'trailing-semicolon',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    if (ast.syntax !== 'sass') {
      ast.traverseByType('block', function (block) {
        var last,
            next;

        try {
          last = block.last('declaration');
        }
        catch (e) {
          return;
        }

        block.forEach('declaration', function (item, i, parent) {
          if (item.contains('value')) {
            var valueNode = item.last('value').content[0];

            if (!valueNode.is('block')) {
              if (helpers.isEqual(last, item)) {
                if (parent.content[i + 1]) {
                  next = parent.content[i + 1];

                  if (next.is('declarationDelimiter')) {
                    if (!parser.options.include) {
                      result = helpers.addUnique(result, {
                        'ruleId': parser.rule.name,
                        'severity': parser.severity,
                        'line': item.end.line,
                        'column': item.end.column,
                        'message': 'No trailing semicolons allowed'
                      });
                    }
                  }
                  else {
                    if (parser.options.include) {
                      result = helpers.addUnique(result, {
                        'ruleId': parser.rule.name,
                        'severity': parser.severity,
                        'line': item.last('value').start.line,
                        'column': item.last('value').start.column,
                        'message': 'Trailing semicolons required'
                      });
                    }
                  }
                }
              }
            }
          }
        });
      });
    }

    return result;
  }
};
