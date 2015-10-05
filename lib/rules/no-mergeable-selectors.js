'use strict';

var helpers = require('../helpers');

/**
 * Constructs a syntax complete selector for our selector matching and warning output
 * @param {object} val - the current node / part of our selector
 * @returns {object} - content: The current node with correct syntax e.g. class my-class = '.my-class'
 *
 */

var constructSelector = function (val) {

  var content = val.content;

  if (val.is('id')) {
    content = '#' + val.content;
  }

  else if (val.is('class')) {
    content = '.' + val.content;
  }

  else if (val.is('ident')) {
    content = val.content;
  }

  else if (val.is('attribute')) {
    var selector = '[';

    val.forEach( function (attrib) {
      selector += constructSelector(attrib);
    });

    content = selector + ']';
  }

  else if (val.is('pseudoClass')) {
    content = ':' + val.content;
  }

  else if (val.is('pseudoElement')) {
    content = '::' + val.content;
  }

  else if (val.is('nth')) {
    content = '(' + val.content + ')';
  }

  else if (val.is('nthSelector')) {
    var nthSelector = ':';

    val.forEach( function (attrib) {
      nthSelector += constructSelector(attrib);
    });

    content = nthSelector;
  }

  else if (val.is('space')) {
    content = ' ';
  }

  else if (val.is('parentSelector')) {
    content = val.content;
  }

  else if (val.is('combinator')) {
    content = val.content;
  }

  return content;

};

module.exports = {
  'name': 'no-mergeable-selectors',
  'defaults': {
    'whitelist': []
  },
  'detect': function (ast, parser) {
    var result = [],
        selectorList = [],
        parentSelector = [],

        // we use this array to keep track of the number of nested blocks and their levels
        // seen as we will always start with a single block at level 0 we just the first
        // level count to 1
        childBlocks = [1],
        level = 0;

    ast.traverseByType('ruleset', function (ruleset) {
      var selectorBlock = {
            selector: parentSelector.join(' '),
            line: ''
          },
          curSelector = '',
          delimOrder = [];

      ruleset.forEach('selector', function (selector) {
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
            curSelector += ', ';
            // remove the next delim and selector from our order as we are only looping over selectors
            delimOrder.splice(0, 2);

          }
          else {
            // if no delim then just remove the current selectors marker in the order array
            delimOrder.splice(0, 1);
          }

          simpleSelector.forEach(function (val) {
            // construct our selector from its content parts
            curSelector += constructSelector(val);
          });
        });

        // Gonzales keeps the spaces after the selector, we remove them here to keep the selectors recognisable
        // and consisten in the result output.
        curSelector = helpers.stripLastSpace(curSelector);

        // check to see if we are on a level other than default (0)
        if (level) {
          // remove 1 from the block count on the current level
          childBlocks[level] -= 1;
        }

        // check to see if the current ruleset contains any child rulesets
        if (ruleset.first('block').contains('ruleset')) {
          ruleset.first('block').forEach('ruleset', function () {

            // Keep a record of the number of rulesets on the next level of nesting
            if (childBlocks[level + 1]) {
              childBlocks[level + 1] += 1;
            }
            else {
              childBlocks[level + 1] = 1;
            }
          });

          // as we have another level we add a space to the end of the current selector reference
          if (parentSelector[level]) {
            parentSelector[level] += curSelector + ' ';
          }
          else {
            parentSelector[level] = curSelector + ' ';
          }

          // increase our level counter before we start parsing the child rulesets
          level = level + 1;
        }
        // if no child rulesets/blocks then we need to find the level we will next be working on
        else {

          // we scan backwards through our block counter array until we find a number greater than 0
          // We've been decrementing our block counts on the correct level as we've parsed them so a
          // level with a positive count means there are still rulesets here to parse.
          for (var i = childBlocks.length - 1; i >= 0; i-- ) {
            if (childBlocks[i] === 0) {

              // remove the last element from the parent selector array as our level decreases effectively allowing
              // us to correctly concat our parent and child selectors
              parentSelector.splice(parentSelector.length - 1, 1);

              // if we're not on level 0 then we want to decrement the level as there are no child rules of this block left to parse.
              // We then remove the 0 count element from the end of the childblocks array to make it ready for use again.
              if (level) {
                level = level - 1;
                childBlocks.splice(childBlocks.length - 1, 1);
              }
            }
            else {

              // if the current level has rulesets to parse we break out of the for loop
              break;
            }
          }
        }

        // set the line of the current selector blocks start for our error messages
        // keep a reference with this for our current selector
        selectorBlock.line = ruleset.start.line;
        selectorBlock.selector += curSelector;

      });

      // we check to see if our selector has already been encountered, if it has we generate a lint warning/error
      // detailing which selector is failing and on which line.
      var present = helpers.propertySearch(selectorList, selectorBlock.selector, 'selector');

      if (present !== -1) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': ruleset.start.line,
          'column': ruleset.start.column,
          'message': 'Rule `' + curSelector + '` should be merged with the rule on line ' + selectorList[present].line,
          'severity': parser.severity
        });
      }
      else {

        // if the current selector is whitelisted we don't add it to the selector list to be checked against.
        if (parser.options.whitelist.indexOf(selectorBlock.selector) === -1) {

          // push the selector to our master list/array of selectors currently parsed without error.
          selectorList.push(selectorBlock);
        }
      }
    });
    return result;
  }
};
