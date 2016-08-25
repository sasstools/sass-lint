'use strict';

var helpers = require('../helpers');

/**
 * Get the 'last' node of the tree
 *
 * @param {Object} node - The node whose last child we want to return
 * @returns {Object} The last node
 */
var getLastNode = function (node) {
  var last = node.last();

  return last ? getLastNode(last) : node;
};

module.exports = {
  'name': 'max-file-line-count',
  'defaults': {
    length: 300
  },
  'detect': function (ast, parser) {
    var result = [];
    var last;

    // If the syntax is Sass we must recursively loop to determine the last node.
    // This is not required for SCSS which will always use the last node in the
    // content of the parent stylesheet node
    if (ast.syntax === 'sass') {
      last = getLastNode(ast);
    }
    else {
      last = ast.content[ast.content.length - 1];
    }

    if (last.end.line > parser.options.length) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': last.end.line,
        'column': 0,
        'message': 'This file has ' + last.end.line + ' lines, which exceeds the maximum of ' + parser.options.length + ' lines allowed.',
        'severity': parser.severity
      });
    }

    return result;
  }
};
