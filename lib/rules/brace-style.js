'use strict';

var helpers = require('../helpers');

/**
 * Determine if statement is a single line statement
 *
 * @param {Object} node - The statement to check
 * @returns {bool} True or false
 */
var isSingleLineStatement = function (node) {
  return node.start.line === node.end.line;
};

/**
 * Determine if opening brace of statement is on a new line
 *
 * @param {Object} nodeA - The previous block
 * @param {Object} nodeB - The current block
 * @returns {bool} True or false
 */
var isOpeningBraceOnNewLine = function (nodeA, nodeB) {
  return nodeA.end.line === nodeB.start.line;
};

/**
 * Determine if closing brace of statement is on new line
 *
 * @param {Object} node - The current block
 * @returns {bool|null} True or false if relevant else null
 */
var isClosingBraceOnNewLine = function (node) {
  if (node.contains('block')) {
    var content = node.first('block'),
        contentLength = content.length - 1,
        lastNode = content.get(contentLength);

    if (lastNode.is('space') && helpers.hasEOL(lastNode.content)) {
      return true;
    }
    return false;
  }
  return null;
};

/**
 * Determine if condition starts on a new line by checking the leading node for
 * an end-of-line
 *
 * @param {Object} node - The node that is our condition
 * @param {Object} parentNode - The condition node's parent
 * @param {Number} j - The index of our node in the context of the parent's children
 * @returns {bool|null} True or false if relevant else null
 */
var isConditionOnNewLine = function (node, parentNode, j) {
  // Only check if it's an @else condition
  if (node.contains('ident') && node.first('ident').content === 'else') {
    // Reverse back up tree
    var previousChild = parentNode.get(--j);

    // Determine if we have a leading new line
    if (previousChild.is('space') && helpers.hasEOL(previousChild.content)) {
      return true;
    }
    return false;
  }
  return null;
};

module.exports = {
  'name': 'brace-style',
  'defaults': {
    'style': '1tbs',
    'allow-single-line': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['conditionalStatement', 'atrule', 'ruleset', 'mixin', 'loop'], function (block, i, parent) {
      var currentNode = false,
          previousNode = false,
          checks = {
            singleLineStatement: null,
            openingBraceOnNewLine: null,
            closingBraceOnNewLine: null,
            conditionOnNewLine: null
          },
          messages = [
            'Single line statements are not allowed',
            'Opening brace must be on same line as condition',
            'Brace must be on a new line',
            'Statement must start on same line as closing brace of previous statement',
            'Statement must begin on a new line',
            'Closing brace must be on a new line'
          ];

      //////////////////////////////
      // Assign current & previous nodes
      //////////////////////////////
      currentNode = block.contains('block') ? block.first('block') : false;

      // Rulesets
      if (block.is('ruleset')) {
        previousNode = block.contains('selector') ? block.last('selector') : false;
      }

      // Conditonal statements
      if (block.is('conditionalStatement')) {
        var previousParent = block.contains('condition') ? block.last('condition') : false;
        previousNode = previousParent && previousParent.contains('atkeyword') ? previousParent.last('atkeyword') : false;
      }

      // Functions, Mixins, Loops
      if (block.is('atrule') || block.is('mixin') || block.is('loop')) {
        previousNode = block.contains('atkeyword') ? block.last('atkeyword') : false;
      }

      // If we've picked up a return @rule ignore it
      if (block.is('atrule')) {
        if (previousNode.contains('ident') && previousNode.first('ident').content === 'return') {
          return false;
        }
      }

      //////////////////////////////
      // The rule checks
      //////////////////////////////

      // Determine if single line statement
      checks.singleLineStatement = isSingleLineStatement(block);

      // Determine if condition is on a new line
      if (block.is('atrule') || block.is('conditionalStatement')) {
        checks.conditionOnNewLine = isConditionOnNewLine(previousNode, parent, i);
      }

      // Determine if opening brace is on new line
      if (previousNode && currentNode) {
        checks.openingBraceOnNewLine = isOpeningBraceOnNewLine(previousNode, currentNode);
      }

      // Determine if closing brace is on new line
      checks.closingBraceOnNewLine = isClosingBraceOnNewLine(block);

      //////////////////////////////
      // Build results
      //////////////////////////////
      if (checks.singleLineStatement === false && checks.closingBraceOnNewLine === false) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': currentNode.end.line,
          'column': currentNode.end.column,
          'message': messages[5],
          'severity': parser.severity
        });
      }

      if (checks.singleLineStatement === true) {
        if (parser.options['allow-single-line'] === false) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column,
            'message': messages[0],
            'severity': parser.severity
          });
        }
        return false;
      }

      if (previousNode && currentNode) {

        //////////////////////////////
        // Brace style: 1tbs
        //////////////////////////////
        if (parser.options.style === '1tbs') {
          if (checks.openingBraceOnNewLine === false) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': currentNode.start.line,
              'column': currentNode.start.column,
              'message': messages[1],
              'severity': parser.severity
            });
          }
          if (checks.conditionOnNewLine === true) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': previousNode.start.line,
              'column': previousNode.start.column,
              'message': messages[3],
              'severity': parser.severity
            });
          }
        }

        //////////////////////////////
        // Brace style: stroustrup
        //////////////////////////////
        if (parser.options.style === 'stroustrup') {
          if (checks.openingBraceOnNewLine === false) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': currentNode.start.line,
              'column': currentNode.start.column,
              'message': messages[1],
              'severity': parser.severity
            });
          }
          if (checks.conditionOnNewLine === false) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': previousNode.start.line,
              'column': previousNode.start.column,
              'message': messages[4],
              'severity': parser.severity
            });
          }
        }

        //////////////////////////////
        // Brace style: allman
        //////////////////////////////
        if (parser.options.style === 'allman') {
          if (checks.openingBraceOnNewLine === true) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': currentNode.start.line,
              'column': currentNode.start.column,
              'message': messages[2],
              'severity': parser.severity
            });
          }
          if (checks.conditionOnNewLine === false) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': previousNode.start.line,
              'column': previousNode.start.column,
              'message': messages[4],
              'severity': parser.severity
            });
          }
        }
      }
    });

    return result;
  }
};
