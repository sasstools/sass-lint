'use strict';

var gonzales = require('gonzales-pe'),
    helpers = require('../helpers');

module.exports = {
  'name': 'indentation',
  'defaults': {
    'size': 2,
    'type': 'space'
  },
  'detect': function (ast, parser) {
    var result = [],
        syntax,
        value;

    var processNode = function (node, level) {
      var i,
          n,
          space,
          last;


      level = level || 0;

      if (node.is('braces')) {
        return;
      }

      for (i = 0; i < node.length; i++) {
        n = node.get(i);

        if (!n) {
          continue;
        }

        if (n.type === 'space') {
          space = n.content.lastIndexOf('\n');
          if (space >= 0) {
            space = n.content.slice(space + 1).length;
            if (space / parser.options.size !== level) {
              if (i !== node.length - 1) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': node.content[i + 1].start.line,
                  'column': node.content[i + 1].start.column,
                  'message': 'Found indentation of ' + space + ', expected ' + level * parser.options.size,
                  'severity': parser.severity
                });
              }
            }
          }
        }

        if (n.is('block') || n.is('atrulers') || n.is('parentheses')) {
          level++;
        }

        processNode(n, level);
      }
    }

    processNode(ast);

    return result;
  }
}