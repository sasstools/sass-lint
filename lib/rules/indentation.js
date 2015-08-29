'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'indentation',
  'defaults': {
    'size': 2
  },
  'detect': function (ast, parser) {
    var result = [];

    var processNode = function (node, level) {
      var i,
          n,
          space,
          spaceLength,
          count;


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
            spaceLength = n.content.slice(space + 1).length;

            try {
              count = n.content.slice(space + 1).match(/ /g).length;
            }
            catch (e) {
              count = 0;
            }

            if (spaceLength / parser.options.size !== level) {
              if (count !== spaceLength) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': node.content[i + 1].start.line,
                  'column': node.content[i + 1].start.column,
                  'message': 'Mixed tabs and spaces',
                  'severity': parser.severity
                });
              }
              if (i !== node.length - 1) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': node.content[i + 1].start.line,
                  'column': node.content[i + 1].start.column,
                  'message': 'Indentation of ' + spaceLength + ', expected ' + level * parser.options.size,
                  'severity': parser.severity
                });
              }
            }
          }
        }



        if (n.is('block') || n.is('atrulers') || (n.is('parentheses') && !node.is('atruleb'))) {
          level++;
        }

        processNode(n, level);
      }
    };

    processNode(ast);

    return result;
  }
};
