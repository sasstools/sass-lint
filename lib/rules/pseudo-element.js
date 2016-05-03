'use strict';

var helpers = require('../helpers'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

var pseudoElements = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, '../../data', 'pseudoElements.yml'), 'utf8')
    ).split(' '),
    pseudoClasses = yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, '../../data', 'pseudoClasses.yml'), 'utf8')
    ).split(' ');

var prefixFree = function prefixFree (name) {
  return typeof name === 'string' && name.charAt(0) === '-' ? helpers.stripPrefix(name) : name;
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
