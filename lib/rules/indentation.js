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
          prevNode,
          space,
          spaceLength,
          count;

      level = level || 0;

      if (node.is('braces')) {
        return;
      }

      for (i = 0; i < node.length; i++) {
        n = node.get(i);
        prevNode = node.get(i - 1);

        if (!n) {
          continue;
        }

        if (n.type === 'space') {
          // Test for CRLF first, since it includes LF
          space = n.content.lastIndexOf('\r\n');

          if (space === -1) {
            space = n.content.lastIndexOf('\n');
          }

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

        // if a delimeter is encountered we check if it's directly after a parenthesis node
        // if it is we know next node will be the same level of indentation
        if (n.is('operator')) {
          if (n.content === ',' && prevNode.is('parentheses')) {
            level--;
          }
        }

        // if a block node is encountered we first check to see if it's within an include/function
        // by checking if the node also contains argumentts, if it does we skip the block as we add a level
        // for arguments anyway. If not the the block is a usual ruleset block and should be treated accordingly
        // The other checks are kept from 1.0 and work for their respective types.
        if ((n.is('block') && !node.contains('arguments'))
          || n.is('atrulers')
          || n.is('arguments')
          || (n.is('parentheses') && !node.is('atruleb'))
        ) {
          level++;
        }

        processNode(n, level);
      }
    };

    processNode(ast);

    return result;
  }
};
