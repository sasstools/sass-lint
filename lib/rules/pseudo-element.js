'use strict';

var helpers = require('../helpers');

var pseudoElements = [
  'after',
  'before',
  'first-letter',
  'first-line',
  'selection',
  'backdrop'
];

var pseudoClasses = [
  'active',
  'checked',
  'disabled',
  'empty',
  'enabled',
  'first-child',
  'first-of-type',
  'focus',
  'hover',
  'in-range',
  'invalid',
  'lang',
  'last-child',
  'last-of-type',
  'link',
  'not',
  'nth-child',
  'nth-last-child',
  'nth-last-of-type',
  'nth-of-type',
  'only-of-type',
  'only-child',
  'optional',
  'out-of-range',
  'read-only',
  'read-write',
  'required',
  'root',
  'target',
  'valid',
  'visited'
];

var prefixFree = function prefixFree (name) {
  return name.charAt(0) === '-' ? helpers.stripPrefix(name) : name;
};

var isPseudoElement = function isPseudoElement (name) {
  return pseudoElements.indexOf(prefixFree(name)) !== -1;
};

var isPseudoClass = function isPseudoClass (name) {
  return pseudoClasses.indexOf(prefixFree(name)) !== -1;
};

module.exports = {
  'name': 'colons',
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('pseudoClass', function (node) {
      if (isPseudoElement(node.content[0].content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Pseudo-elements must start with double colons',
          'severity': parser.severity
        });
      }
    });

    ast.traverseByType('pseudoElement', function (node) {
      if (isPseudoClass(node.content[0].content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Pseudo-classes must start with single colon',
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};
