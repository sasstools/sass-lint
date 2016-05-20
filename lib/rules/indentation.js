'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'indentation',
  'defaults': {
    'size': 2
  },
  'detect': function (ast, parser) {
    var result = [],
        inAtRule = false,
        inProps = true,
        lintSize = parser.options.size,
        lintType = 'space';

    if (parser.options.size === 'tab') {
      lintSize = 1;
      lintType = 'tab';
    }

    var processNode = function (node, level) {
      var i,
          n,
          prevNode,
          space,
          spaceLength,
          newlineLength,
          detected = [],
          spaceCount,
          tabCount,
          plural = '',
          mixedWarning;

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
          newlineLength = 2;

          if (space === -1) {
            // Test for LF
            space = n.content.lastIndexOf('\n');
            newlineLength = 1;
          }

          if (space >= 0) {
            // Check how many spaces or tabs we have and set our plural character if necessary for
            // our lint reporting message
            spaceLength = n.content.slice(space + newlineLength).length;
            spaceCount = n.content.slice(space + newlineLength).match(/ /g);
            tabCount = n.content.slice(space + newlineLength).match(/\t/g);
            plural = spaceLength > 1 ? 's' : '';

            // if we've encountered a space check if we have before if not save a reference
            if (spaceCount !== null && detected.indexOf('space') === -1) {
              detected.push('space');
            }

            // if we've encountered a tab check if we have before if not save a reference
            if (tabCount !== null && detected.indexOf('tab') === -1) {
              detected.push('tab');
            }

            // Check if expected indentation matches what it should be
            if (spaceLength / lintSize !== level) {
              var next = node.content[i + 1] || false;

              // ignore lines that just contain whitespace
              if (next) {
                if (detected.length > 1) {
                  // Indicates we've told the user about mixed tabs and spaces in their file
                  mixedWarning = true;
                  // remove the last detected type from our detected array,
                  // if we encounter a mix again we'll output again but all the while keep a reference
                  // to the first space character (tab or space) that we encountered so as to be
                  // consistent with our warnings
                  detected.pop();

                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': next.start.line,
                    'column': next.start.column,
                    'message': 'Mixed tabs and spaces',
                    'severity': parser.severity
                  });
                }
                // Generate a lint message if our indentation is incorrect but also prevent these
                // messages appearing on lines with mixed tabs and spaces as we shouldn't be guessing
                // as to a users tab size when using spaces etc
                if (i !== node.length - 1 && !mixedWarning) {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': next.start.line,
                    'column': next.start.column,
                    'message': 'Expected indentation of ' + level * lintSize + ' ' + lintType + plural + ' but found ' + spaceLength + '.',
                    'severity': parser.severity
                  });
                }
                // Reset our mixedWarning flag so we can show these again if encountered
                mixedWarning = false;
              }
            }
          }
        }
        // if we're in an atrule make we need to possibly handle multiline arguments
        if (n.is('atrule')) {
          inAtRule = true;
        }

        // if a delimeter is encountered we check if it's directly after a parenthesis node
        // if it is we know next node will be the same level of indentation
        if (n.is('operator')) {
          if (n.content === ',' && prevNode.is('parentheses')) {
            if (inAtRule && !inProps) {
              level++;
              inProps = true;
            }
            else if (!inProps) {
              level--;
            }
          }
        }

        // if a block node is encountered we first check to see if it's within an include/function
        // by checking if the node also contains arguments, if it does we skip the block as we add a level
        // for arguments anyway. If not the the block is a usual ruleset block and should be treated accordingly
        // The other checks are kept from 1.0 and work for their respective types.
        if ((n.is('block') && !node.contains('arguments'))
          || n.is('arguments')
          || (n.is('parentheses') && !node.is('atrule'))
        ) {
          inAtRule = false;
          inProps = false;
          level++;
        }

        processNode(n, level);
      }
    };

    processNode(ast);

    return result;
  }
};
