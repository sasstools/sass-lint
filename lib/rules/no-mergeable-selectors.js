'use strict';

var helpers = require('../helpers');

var mergeableNodes = ['atrule', 'include', 'ruleset'],
    validAtRules = ['media'],
    simpleIdents = ['ident', 'number', 'operator', 'combinator', 'string', 'parentSelector', 'delimiter', 'typeSelector', 'attributeMatch'],
    curLevel = 0,
    curSelector = [],
    parentSelector = [],
    selectorList = [],
    syntax = '';


/**
 * Adds grammar around our content blocks to construct selectors with
 * more readable formats.
 *
 * @param {object} val - The current value node
 * @param {string} prefix - The grammar to prefix the value with
 * @param {string} suffix - The grammar to add after the value
 * @returns {string} The correct readable format
 */
var addGrammar = function (val, prefix, suffix) {
  return prefix + val.content + suffix;
};

/**
 * Adds grammar around our content blocks to construct selectors with
 * more readable formats and loops the content as they're within sub blocks.
 *
 * @param {object} val - The current value node
 * @param {string} prefix - The grammar to prefix the value with
 * @param {string} suffix - The grammar to add after the value
 * @param {function} constructSelector - The callback we wish to use which means constructSelector in this instance
 * @returns {string} The correct readable format
 */
var constructSubSelector = function (val, prefix, suffix, constructSelector) {
  var content = prefix;
  val.forEach(function (subItem) {
    content += constructSelector(subItem);
  });

  return content + suffix;
};

/**
 * Constructs a syntax complete selector for our selector matching and warning output
 *
 * @param {object} val - The current node / part of our selector
 * @returns {string} - Content: The current node with correct syntax e.g. class my-class = '.my-class'
 */
var constructSelector = function (val) {
  var content = null;

  if (val.is('id')) {
    content = addGrammar(val, '#', '');
  }

  else if (val.is('class')) {
    content = addGrammar(val, '.', '');
  }

  else if (simpleIdents.indexOf(val.type) !== -1) {
    content = val.content;
  }

  else if (val.is('attributeSelector')) {
    content = constructSubSelector(val, '[', ']', constructSelector);
  }

  else if (val.is('atkeyword')) {
    content = constructSubSelector(val, '@', '', constructSelector);
  }

  else if (val.is('placeholder')) {
    content = constructSubSelector(val, '%', '', constructSelector);
  }

  else if (val.is('variable')) {
    content = constructSubSelector(val, '$', '', constructSelector);

  }

  else if (val.is('pseudoClass')) {
    content = addGrammar(val, ':', '');
  }

  else if (val.is('pseudoElement')) {
    content = addGrammar(val, '::', '');
  }

  else if (val.is('nth')) {
    content = addGrammar(val, '(', ')');
  }

  else if (val.is('nthSelector')) {
    content = constructSubSelector(val, ':', '', constructSelector);
  }

  else if (val.is('parentheses')) {
    content = constructSubSelector(val, '(', ')', constructSelector);
  }

  else if (val.is('space')) {
    content = ' ';
  }

  else if (val.is('parentSelectorExtension') || val.is('attributeName') || val.is('attributeValue') || val.is('dimension')) {
    content = constructSubSelector(val, '', '', constructSelector);
  }

  return content;
};

/**
 * Traverses a block and calls our callback function for each block encountered
 *
 * @param {object} block - The current node / part of our selector
 * @param {object} cb - The callback function we wish to apply to each block
 * @returns {undefined}
 */
var traverseBlock = function (block, cb) {
  block.forEach(function (contentItem) {
    cb(contentItem);
  });
};

/**
 * Traverses a block and calls our callback function for each block encountered
 *
 * @param {string} ruleSet - The current selector
 * @param {boolean} isAtRule - Whether the ruleSet is an atRule
 * @param {string} line - The line that the ruleset starts
 * @param {string} col - The column that the ruleset starts
 * @returns {undefined}
 */
var updateList = function (ruleSet, isAtRule, line, col) {
  parentSelector[curLevel] = ruleSet;
  curSelector = {
    selector: helpers.stripLastSpace(parentSelector.join('')),
    line: line,
    column: col
  };
  if (!isAtRule) {
    selectorList.push(curSelector);
  }
};

/**
 * Checks a rulesets contents for selectors and calls our consstructSelector method
 *
 * @param {object} ruleNode - The current node / part of our selector
 * @returns {undefined}
 */
var checkRuleset = function (ruleNode) {
  var ruleSet = '';
  ruleNode.forEach(function (ruleNodeItem) {
    if (!ruleNodeItem.is('block')) {
      if (ruleNodeItem.is('selector')) {
        ruleNodeItem.forEach(function (selectorContent) {
          ruleSet += constructSelector(selectorContent);
        });
      }
      else if (ruleNodeItem.is('delimiter') || ruleNodeItem.is('space')) {
        ruleSet += constructSelector(ruleNodeItem);
      }
    }
  });
  if (ruleSet !== '') {
    updateList(ruleSet, false, ruleNode.start.line, ruleNode.start.column);
  }
};

/**
 * Checks an atRule contents for selectors and calls our consstructSelector method
 *
 * @param {object} atRule - The current node / atRule part of our selector
 * @returns {undefined}
 */
var checkAtRule = function (atRule) {
  var test = '';
  atRule.forEach(function (atRuleItem) {
    if (!atRuleItem.is('block')) {
      test += constructSelector(atRuleItem);
    }
  });
  updateList(test, true, atRule.start.line, atRule.start.column);
};

/**
 * Checks an atRule to see if if it's part of our mergeable at rule list.
 * It also checks for Sass syntax as gonzales currently has issues with the syntax
 *
 * @param {object} node - The current node / atRule part of our selector
 * @returns {boolean} Whether this atRule should be merged or not
 */
var isMergeableAtRule = function (node) {
  var isMergeable = false;
  node.forEach(function (item) {
    // TODO Check back when Gonzales updates to fix this
    // Gonzales has issues with nest levels in media queries :(
    if (item.is('atkeyword') && validAtRules.indexOf(item.first('ident').content) !== -1 && syntax !== 'sass') {
      isMergeable = true;
    }
  });

  return isMergeable;
};

/**
 * Checks if a node contains a block and if so calls our traverseBlock method. Also
 * handles our current level counter.
 *
 * @param {object} node - The current node / atRule part of our selector
 * @param {object} cb - The callback function we wish to pass through
 * @returns {undefined}
 */
var checkForBlock = function (node, cb) {
  if (node.contains('block')) {
    curLevel += 1;
    node.forEach('block', function (block) {
      traverseBlock(block.content, cb);
    });
    curLevel -= 1;
    parentSelector.pop();
  }
};

/**
 * Traverses a node and checks for rulesets and at rules and then fires off to the
 * respective method for them to be handled
 *
 * @param {object} node - The current node / atRule part of our selector
 * @returns {undefined}
 */
var traverseNode = function (node) {
  if (mergeableNodes.indexOf(node.type) !== -1) {
    if (node.is('ruleset')) {
      checkRuleset(node);
      checkForBlock(node, traverseNode);
    }
    else if (node.is('atrule')) {
      if (isMergeableAtRule(node)) {
        checkAtRule(node);
        checkForBlock(node, traverseNode);
      }
    }
  }
};

/**
 * Checks our selector list for mergeable selectors and reports errors where needed
 *
 * @param {object} parser - The parser object
 * @returns {array} Array of result objects
 */
var checkMergeable = function (parser) {
  var result = [];
  selectorList.forEach(function (item, index, arr) {
    var pos = helpers.propertySearch(arr, item.selector, 'selector');
    if (pos !== index && parser.options.whitelist.indexOf(item.selector) === -1) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': item.line,
        'column': item.column,
        'message': 'Rule `' + item.selector + '` should be merged with the rule on line ' + selectorList[pos].line,
        'severity': parser.severity
      });
    }
  });
  return result;
};

module.exports = {
  'name': 'no-mergeable-selectors',
  'defaults': {
    'whitelist': []
  },
  'detect': function (ast, parser) {
    curLevel = 0;
    curSelector = [];
    parentSelector = [];
    selectorList = [];
    syntax = ast.syntax;
    ast.traverseByType('stylesheet', function (styleSheet) {
      traverseBlock(styleSheet, traverseNode);
    });
    return checkMergeable(parser);
  }
};
