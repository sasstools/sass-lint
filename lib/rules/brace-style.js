'use strict';

var helpers = require('../helpers');

var isSingleLineStatement = function (node) {
  return node.start.line === node.end.line;
};

var createPreviousNode = function (node) {
  return {
    content: '',
    start: {
      line: node.start.line,
      column: node.start.column - 1
    },
    end: {
      line: node.end.line,
      column: node.end.column
    }
  };
};

var getElsePrevious = function (atKeyword, parent, i) {
  if (atKeyword.contains('ident')) {
    if (atKeyword.first('ident').content === 'else') {
      var prev = parent.get(i - 1);

      if (prev.is('space')) {
        return prev;
      }
      else if (prev.is('atruleb')) {
        return createPreviousNode(atKeyword.first('ident'));
      }
    }
  }
};

module.exports = {
  'name': 'brace-style',
  'defaults': {
    'style': '1tbs',
    'allow-single-line': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['conditionalStatement', 'atruleb', 'selector', 'mixin', 'loop'], function (block, i, parent) {
      var next = false,
          previous = false,
          isSingleLine = false;

      // Store leading space node for @elseif statements
      if (block.is('atruleb')) {
        if (block.contains('atkeyword')) {
          previous = getElsePrevious(block.first('atkeyword'), parent, i);
        }
      }

      // Store leading space node for @else statements
      if (block.is('conditionalStatement')) {
        if (block.contains('condition')) {
          var condition = block.first('condition');

          if (condition.contains('atkeyword')) {
            previous = getElsePrevious(condition.first('atkeyword'), parent, i);
          }
        }
      }

      // Store trailing space node for conditional statements, mixins and loops
      if (block.is('atruleb') || block.is('conditionalStatement') || block.is('mixin') || block.is('loop')) {
        // Since a node of type block should be the last node within 'block',
        // go back 2 to determine if there is a newline
        next = block.content[block.content.length - 2];

        // Determine if single line statement
        isSingleLine = isSingleLineStatement(block);
      }

      // Store trailing space node for selectors
      if (block.is('selector')) {
        if (block.contains('simpleSelector')) {
          var lastSelector = block.last('simpleSelector');

          next = lastSelector.content[lastSelector.content.length - 1];
        }

        // Determine if single line statement
        if (parent.is('ruleset')) {
          isSingleLine = isSingleLineStatement(parent);
        }
      }

      if ((parser.options['allow-single-line'] === false) && isSingleLine) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': block.start.line,
          'column': block.start.column,
          'message': 'Single line statements are not allowed',
          'severity': parser.severity
        });
      }
      else {

        if (next) {
          if (!helpers.hasEOL(next.content)) {
            if (parser.options.style === 'allman') {
              // Report if it's not single line statement
              if (!((parser.options['allow-single-line'] === true) && isSingleLine)) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': next.start.line,
                  'column': next.start.column,
                  'message': 'Brace must be on a new line',
                  'severity': parser.severity
                });
              }
            }
          }

          if (helpers.hasEOL(next.content)) {
            if (parser.options.style === '1tbs' || parser.options.style === 'stroustrup') {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': next.start.line,
                'column': next.start.column,
                'message': 'Brace must be on same line as condition',
                'severity': parser.severity
              });
            }
          }
        }

        if (previous) {
          if (!helpers.hasEOL(previous.content)) {
            if (parser.options.style === 'allman' || parser.options.style === 'stroustrup') {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': previous.start.line,
                'column': previous.start.column,
                'message': 'Statement should begin on a new line',
                'severity': parser.severity
              });
            }
          }

          if (helpers.hasEOL(previous.content)) {
            if (parser.options.style === '1tbs') {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': previous.start.line,
                'column': previous.start.column,
                'message': 'Statement on next line should begin on the current line',
                'severity': parser.severity
              });
            }
          }
        }
      }
    });

    return result;
  }
};
