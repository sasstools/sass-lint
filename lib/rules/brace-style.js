'use strict';

var helpers = require('../helpers'),
    os = require('os');

var isSingleLineStatement = function (node) {
  return node.start.line === node.end.line;
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
        var atKeyword = block.first('atkeyword');

        if (atKeyword.first('ident').content === 'else') {
          previous = parent.get(i - 1);
        }
      }

      // Store leading space node for @else statements
      if (block.is('conditionalStatement')) {
        previous = parent.get(i - 1);
      }

      // Store trailing space node for conditional statements, mixins and loops
      if (block.is('atruleb') || block.is('conditionalStatement') || block.is('mixin') || block.is('loop')) {
        next = block.last('space');

        // Determine if single line statement
        isSingleLine = isSingleLineStatement(block);
      }

      // Store trailing space node for selectors
      if (block.is('selector')) {
        next = block.last('simpleSelector').last('space');

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
          if (next.is('space')) {
            if (next.content.indexOf(os.EOL) === -1) {
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

            if (next.content.indexOf(os.EOL) !== -1) {
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
        }

        if (previous) {
          if (previous.is('space')) {
            if (previous.content.indexOf(os.EOL) === -1) {
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

            if (previous.content.indexOf(os.EOL) !== -1) {
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
      }
    });

    return result;
  }
};
