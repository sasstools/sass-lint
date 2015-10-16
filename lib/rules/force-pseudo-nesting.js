'use strict';

var helpers = require('../helpers');

// Our nestable selector types, separated by type for ease of use with rules
// we replace ident with 'selector' for readability'
var nestableElements = ['selector', 'class', 'id'],
    nestableAttributes = ['attribute'],
    nestablePseudo = ['pseudoClass', 'pseudoElement', 'nth', 'nthSelector'],
    // we need to keep track of the current and previous selector type
    prevVal = '',
    curVal = '',

    /**
     * resets the current value and previous value markers to default
     */

    resetNesting = function () {
      curVal = '';
      prevVal = '';
    },

    /**
     * checkNesting
     * Checks the current selector value against the previous selector value and assesses whether they are
     * a) currently an enforced selector type for nesting (user specified - all true by default)
     * b) whether they should be nested
     * @param {object} val - the current node / part of our selector
     * @param {object} parser - and instance of our parser
     * @param {array} result - an array of result objects
     */

    checkNesting = function (val, parser, result) {
      var elements = nestableElements.concat(nestableAttributes, nestablePseudo),
          selector = helpers.constructSelector(val),
          currentStr;

      // Store current node value
      curVal = selector.currentValue;

      // check if they are nestable by checking the previous element against one of the user specified
      // selector types
      if (elements.indexOf(prevVal) !== -1 && nestablePseudo.indexOf(curVal) !== -1) {

        currentStr = helpers.camelCaseToHyphens(curVal);

        if (curVal.indexOf('nth') === -1) {
          currentStr = helpers.capitalize(currentStr);
        }

        helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': val.start.line,
          'column': val.start.column,
          'message': currentStr + ' `' + selector.content + '` should be nested within its parent ' + prevVal,
          'severity': parser.severity
        });
      }

      if (curVal !== '') {
        prevVal = curVal;
        curVal = '';
      }
    };

module.exports = {
  'name': 'force-pseudo-nesting',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('ruleset', function (ruleset) {
      var delimOrder = [];

      ruleset.forEach('selector', function (selector) {

        resetNesting();
        // Keep track of the order of elements & delimeters
        selector.forEach( function (el) {
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
            resetNesting();

            // remove the next delim and selector from our order as we are only looping over selectors
            delimOrder.splice(0, 2);
          }
          else {

            // if no delim then just remove the current selectors marker in the order array
            delimOrder.splice(0, 1);
          }

          simpleSelector.forEach(function (val) {

            // construct our selector from its content parts
            helpers.constructSelector(val);

            checkNesting(val, parser, result);
          });
        });
      });
    });
    return result;
  }
};
