'use strict';

var helpers = require('../helpers');

var operators = ['+', '-', '/', '*', '%', '<', '>', '==', '!=', '<=', '>='];

var getRelationalOperator = function (node) {
  if (node.content === '<') {
    return '<=';
  }

  if (node.content === '>') {
    return '>=';
  }
};

var checkSpacing = function (node, i, parent, parser, result) {
  if (node.is('operator') || node.is('unaryOperator')) {

    var previous = parent.content[i - 1],
        next = parent.content[i + 1],
        operator = node.content;

    // If second part of relational operator move on
    if (
      (node.content === '=')
      && (previous.content === '<' || previous.content === '>')
    ) {
      return false;
    }

    // If first part of relational operator, carry on and build it
    if (
      (node.content === '<' || node.content === '>')
      && (next.content === '=')
    ) {
      operator = getRelationalOperator(node);
      next = parent.content[i + 2];
    }

    // Exception - We should allow valid CSS use of / operators when defining
    // font size/line-height
    if (
      // The parent of said exception is always going to be a value
      parent.is('value')
      // Only the / operator is ever used in this exception
      && operator === '/'
      // The first value is the font-size and must have a unit, therefore a node
      // of type dimension
      && previous.is('dimension')
      // Line-height - can be a number with our without units
      && (next.is('dimension') || next.is('number'))
    ) {
      return false;
    }

    // If the operator checks out in our valid operator list
    if (operators.indexOf(operator) !== -1) {

      if (parser.options.include) {
        if (!previous.is('space') || !next.is('space')) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Space expected around operator',
            'severity': parser.severity
          });
        }
        else {
          if (
              ((previous.end.line >= previous.start.line) && (previous.end.column > previous.start.column))
              || (next.end.line >= next.start.line) && (next.end.column > next.start.column)
            ) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': node.start.line,
              'column': node.start.column,
              'message': 'Multiple spaces not allowed around operator',
              'severity': parser.severity
            });
          }
        }
      }
      else {
        if (previous.is('space') || next.is('space')) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'No spaces allowed around operator',
            'severity': parser.severity
          });
        }
      }
    }
  }
};

module.exports = {
  'name': 'space-around-operator',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    // FIXME: Gonzales beta - No longer need atrulerq (for Sass)
    ast.traverseByTypes(['condition', 'atruleb', 'value', 'atrulerq'], function (node) {
      node.forEach(function (item, i, parent) {
        // Perform another loop of the children if we come across a parenthesis
        // parent node
        if (item.is('parentheses')) {
          item.forEach(function (child, j, childParent) {
            // Do the spacing checks
            checkSpacing(child, j, childParent, parser, result);
          });
        }
        else {
          // Do the spacing checks
          checkSpacing(item, i, parent, parser, result);
        }
      });
    });

    return result;
  }
};
