'use strict';

var helpers = require('../helpers');

var counter;

var findNearestReturn = function (parent, i) {
  var previous = false,
      space = null;

  if (parent.content[i - 1]) {
    previous = parent.content[i - 1];

    if (counter == 2) {
      return {
        space: true,
        previous: previous
      };
    }

    if (previous.is('space') || previous.is('declarationDelimiter')) {
      if (helpers.hasEOL(previous.content)) {
        counter++;
      }

      return findNearestReturn(parent, i - 1);
    }

    // If ruleset, we must reset the parent to be the previous node and
    // loop through that
    else if (previous.is('ruleset') || previous.is('include')) {
      var previousNode = previous.content[previous.content.length - 1];

      // Set the i parameter for findNearestReturn to be the length of the
      // content array in order to get the last one
      return findNearestReturn(previousNode, previousNode.content.length);
    }
    else {
      counter = 0;

      if (previous.type.indexOf('Comment') !== -1) {

        // If it's the first line
        if (previous.start.line === 1) {
          return space = {
            space: true,
            previous: previous
          };
        }

        return findNearestReturn(parent, i - 1);
      }
    }
  }

  return space = {
    space: false,
    previous: previous
  }
};

module.exports = {
  'name': 'empty-line-between-blocks',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('ruleset', function (node, j, p) {
      var space;

      // Reset the counter for each ruleset
      counter = 0;

      if (node.is('ruleset')) {

        node.forEach('block', function (block, i, parent) {
          var previous;

          // If we can go up one, reassign the 'previous node'
          if (parent.content[i - 1]) {
            previous = parent.content[i - 1];
          } else {
            // If we can't, go back current to previous
            previous = block;
          }

          // If it's a new line, lets go back up to the selector
          if (previous.is('space') && helpers.hasEOL(previous.content)) {

            // If we have a node (most likely type of selector)
            if (parent.content[i - 2]) {

              if (typeof parent.content[i - 3] === 'undefined') {
                space = findNearestReturn(p, j);
              }
            }
          }
        });
      }

      if (space && space.previous) {
        if (space.previous.start.line !== 1) {
          if (parser.options.include && !space.space) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': space.previous.end.line + 1,
              'column': 1,
              'message': 'Space expected between blocks',
              'severity': parser.severity
            });
          }
          else if (!parser.options.include && space.space) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': space.previous.end.line + 1,
              'column': 1,
              'message': 'Space not allowed between blocks',
              'severity': parser.severity
            });
          }
        }
      }
    });

    return result;
  }
};
