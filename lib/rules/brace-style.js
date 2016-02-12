'use strict';

var helpers = require('../helpers');

/**
 * Get the current block within a node
 *
 * @param {Object} node - The node containing our desired block
 * @returns {Object} The current block of the node
 */
var getCurrentNode = function (node) {
  return node.contains('block') ? node.first('block') : false;
};

/**
 * Get the previous node
 *
 * @param {Object} node - Our current node
 * @returns {Object|bool} The previous node or false if not found
 */
var getPreviousNode = function (node) {
  // Rulesets
  if (node.is('ruleset')) {
    return node.contains('selector') ? node.last('selector') : false;
  }

  // Conditonal statements
  if (node.is('conditionalStatement')) {
    var previousParent = node.contains('condition') ? node.last('condition') : false;
    return previousParent && previousParent.contains('atkeyword') ? previousParent.last('atkeyword') : false;
  }

  // Functions, Mixins, Loops
  if (node.is('atrule') || node.is('mixin') || node.is('loop')) {
    return node.contains('atkeyword') ? node.last('atkeyword') : false;
  }
};

/**
 * Determine if current node is an exception and end checks if it is
 * If we've picked up a return @rule ignore it
 *
 * @param {Object} node - The original node
 * @param {object} currentNode - The current node block
 * @param {Object} previousNode - The node previous to our current node
 * @returns {bool} Wtether or not the it is an exception
 */
var isException = function (node, currentNode, previousNode) {
  if (node.is('atrule')) {
    if (previousNode.contains('ident') && previousNode.first('ident').content === 'return') {
      return true;
    }
  }
  return false;
};

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
    var previousChild = parentNode.get(--j) || false;

    if (previousChild) {
      // Determine if we have a leading new line
      if (previousChild.is('space') && helpers.hasEOL(previousChild.content)) {
        return true;
      }
      return false;
    }
    return false;
  }
  return null;
};

/**
 * Run the rule checks and return their results
 *
 * @param {Object} node - The original node
 * @param {Object} currentNode - The current node block
 * @param {Object} previousNode - The node previous to our current node
 * @param {Object} parentNode - The parent of the original node
 * @param {int} index - The index of the original node
 * @returns {Object} The results of the rule checks
 */
var runRuleChecks = function (node, currentNode, previousNode, parentNode, index) {
  var checks = {};

  // Determine if single line statement
  checks.singleLineStatement = isSingleLineStatement(node);

  // Determine if condition is on a new line
  if (node.is('atrule') || node.is('conditionalStatement')) {
    checks.conditionOnNewLine = isConditionOnNewLine(previousNode, parentNode, index);
  }

  // Determine if opening brace is on new line
  if (previousNode && currentNode) {
    checks.openingBraceOnNewLine = isOpeningBraceOnNewLine(previousNode, currentNode);
  }

  // Determine if closing brace is on new line
  checks.closingBraceOnNewLine = isClosingBraceOnNewLine(node);

  return checks;
};

/**
 * Create an issue using the supplied information
 *
 * @param {Object} parser - The parser
 * @param {Object} node - The node with the issue
 * @param {string} message - The message to display
 * @returns {Object} An object containing an issue
 */
var createIssue = function (parser, node, message) {
  return {
    'ruleId': parser.rule.name,
    'line': node.end.line,
    'column': node.end.column,
    'message': message,
    'severity': parser.severity
  };
};

module.exports = {
  'name': 'brace-style',
  'defaults': {
    'style': '1tbs',
    'allow-single-line': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['conditionalStatement', 'atrule', 'ruleset', 'mixin', 'loop'], function (node, i, parent) {
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
            'Opening brace must be on the same line as condition',
            'Brace must be on a new line',
            'Statement must start on the same line as the closing brace of the previous statement',
            'Statement must begin on a new line',
            'Closing brace must be on a new line'
          ];

      // SCSS syntax only rule
      if (ast.syntax === 'sass') {
        return false;
      }

      // Assign current & previous nodes based on node type
      currentNode = getCurrentNode(node);
      previousNode = getPreviousNode(node);

      // If not an exception carry on
      if (!isException(node, currentNode, previousNode)) {

        // Run and store rule check results
        checks = runRuleChecks(node, currentNode, previousNode, parent, i);

        // Build single-line statement results
        if (checks.singleLineStatement === false && checks.closingBraceOnNewLine === false) {
          result = helpers.addUnique(result, createIssue(parser, currentNode, messages[5]));
        }

        if (checks.singleLineStatement === true) {
          if (parser.options['allow-single-line'] === false) {
            result = helpers.addUnique(result, createIssue(parser, node, messages[0]));
          }
          return false;
        }

        // Build brace-style results
        if (previousNode && currentNode) {
          if (parser.options.style === '1tbs') {
            if (checks.openingBraceOnNewLine === false) {
              result = helpers.addUnique(result, createIssue(parser, currentNode, messages[1]));
            }
            if (checks.conditionOnNewLine === true) {
              result = helpers.addUnique(result, createIssue(parser, previousNode, messages[3]));
            }
          }

          if (parser.options.style === 'stroustrup') {
            if (checks.openingBraceOnNewLine === false) {
              result = helpers.addUnique(result, createIssue(parser, currentNode, messages[1]));
            }
            if (checks.conditionOnNewLine === false) {
              result = helpers.addUnique(result, createIssue(parser, previousNode, messages[4]));
            }
          }

          if (parser.options.style === 'allman') {
            if (checks.openingBraceOnNewLine === true) {
              result = helpers.addUnique(result, createIssue(parser, currentNode, messages[2]));
            }
            if (checks.conditionOnNewLine === false) {
              result = helpers.addUnique(result, createIssue(parser, previousNode, messages[4]));
            }
          }
        }
      }
    });

    return result;
  }
};
