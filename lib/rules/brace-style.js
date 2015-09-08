'use strict';

var helpers = require('../helpers'),
    os = require('os');

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
          previous = false;

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
      }

      // Store trailing space node for selectors
      if (block.is('selector')) {
        next = block.last('simpleSelector').last('space');
      }

      if (next) {
        if (next.is('space')) {
          if (next.content.indexOf(os.EOL) === -1) {
            if (parser.options.style === 'allman') {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': next.start.line,
                'column': next.start.column,
                'message': 'Brace must be on a new line',
                'severity': parser.severity
              });
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
    });

    return result;
  }
};
