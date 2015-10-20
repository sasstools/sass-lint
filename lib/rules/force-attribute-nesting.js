'use strict';

var helpers = require('../helpers'),
    capitalize = require('lodash.capitalize'),
    kebabcase = require('lodash.kebabcase');

// Our nestable selector types, separated by type for ease of use with rules
// we replace ident with 'selector' for readability'
var nestableElements = ['selector', 'class', 'id'],
    nestableAttributes = ['attribute'],
    nestablePseudo = ['pseudoClass', 'pseudoElement', 'nth', 'nthSelector'];

/**
 * Formats a string from camelCase to hyphens and capitalizes
 * @param {string} str - The string to be formatted
 * @returns {string} A hyphenated and capitalized string
 */
var formatOutput = function (str) {
  return capitalize(kebabcase(str));
};

module.exports = {
  'name': 'force-attribute-nesting',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [],
        elements = nestableElements.concat(nestableAttributes, nestablePseudo);

    ast.traverseByType('ruleset', function (ruleset) {
      var delimOrder = [];

      ruleset.forEach('selector', function (selector) {
        // Where we'll store the previous value
        var previousVal;

        // Keep track of the order of elements & delimeters
        selector.forEach(function (el) {
          var curNode = helpers.mapDelims(el);

          if (curNode !== false) {
            delimOrder.push(curNode);
          }
        });

        selector.forEach('simpleSelector', function (simpleSelector) {
          // check if the next selector is proceeded by a delimiter
          // if it is add it to the curSelector output
          var nextType = delimOrder[0];

          if (nextType === 'd') {
            // Empty the previous value store
            previousVal = null;

            // remove the next delim and selector from our order as we are only
            // looping over selectors
            delimOrder.splice(0, 2);
          }
          else {
            // if no delim then just remove the current selectors marker in the
            // order array
            delimOrder.splice(0, 1);
          }

          // Loop each selector while checking if it should be nested
          simpleSelector.forEach(function (node) {
            // Construct the selector and store the current selector value
            var constructedSelector = helpers.constructSelector(node),
                currentVal = constructedSelector.type;

            if (helpers.isNestable(currentVal, previousVal, elements, nestableAttributes)) {
              helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': node.start.line,
                'column': node.start.column,
                'message': formatOutput(currentVal) + ' `' + constructedSelector.content + '` should be nested within its parent ' + previousVal,
                'severity': parser.severity
              });
            }

            if (currentVal) {
              // Store current value as previous and continue with the loop
              previousVal = currentVal;
            }
          });
        });
      });
    });

    return result;
  }
};
