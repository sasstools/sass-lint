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
     * constructSelector
     * Constructs a syntax complete selector for our selector matching and warning output
     * @param {object} val - the current node / part of our selector
     * @returns {string} content - The current node with correct syntax e.g. class my-class = '.my-class'
     */

    constructSelector = function (val) {

      var content = val.content;

      if (val.is('id')) {
        content = '#' + val.content;
        curVal = 'id';
      }

      else if (val.is('class')) {
        content = '.' + val.content;
        curVal = 'class';
      }

      else if (val.is('ident')) {
        content = val.content;
        curVal = 'selector';
      }

      else if (val.is('attribute')) {
        var selector = '[';
        val.forEach( function (attrib) {
          selector += constructSelector(attrib);
        });
        content = selector + ']';
        curVal = 'attribute';
      }

      else if (val.is('pseudoClass')) {
        content = ':' + val.content;
        curVal = 'pseudoClass';
      }

      else if (val.is('pseudoElement')) {
        content = '::' + val.content;
        curVal = 'pseudoElement';
      }

      else if (val.is('nth')) {
        content = '(' + val.content + ')';
        curVal = 'nth';
      }

      else if (val.is('nthSelector')) {
        var nthSelector = ':';
        val.forEach( function (attrib) {
          nthSelector += constructSelector(attrib);
        });
        content = nthSelector;
        curVal = 'nthSelector';
      }

      else if (val.is('space')) {
        content = ' ';
      }

      else if (val.is('parentSelector')) {
        content = val.content;
        curVal = 'parentSelector';
      }

      else if (val.is('combinator')) {
        content = val.content;
        curVal = 'combinator';
      }

      return content;

    },

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
     * @param {string} curSelector - the current selector string
     * @param {object} parser - and instance of our parser
     * @param {array} result - an array of result objects
     */

    checkNesting = function (val, parser, result) {
      var elements = nestableElements.concat(nestableAttributes, nestablePseudo);
      // check if they are nestable by checking the previous element against one of the user specified
      // selector types
      if (elements.indexOf(prevVal) !== -1 && nestableAttributes.indexOf(curVal) !== -1) {
        helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': val.start.line,
          'column': val.start.column,
          'message': curVal + ' `' + constructSelector(val) + '` should be nested within its parent ' + prevVal,
          'severity': parser.severity
        });
      }

      if (curVal !== '') {
        prevVal = curVal;
        curVal = '';
      }
    };

module.exports = {
  'name': 'force-attribute-nesting',
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
            constructSelector(val);

            checkNesting(val, parser, result);

          });
        });
      });
    });
    return result;
  }
};
