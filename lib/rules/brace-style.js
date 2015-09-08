'use strict';

var helpers = require('../helpers'),
    os = require('os');

module.exports = {
  'name': 'brace-style',
  'defaults': {
    'style': '1tbs'
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['conditionalStatement', 'atruleb', 'selector', 'mixin', 'loop'], function (block, i, parent) {
      var next = false,
          previous = false;

      if (block.is('conditionalStatement')) {
        previous = parent.get(i - 1);
      }

      if (block.is('atruleb') || block.is('conditionalStatement') || block.is('mixin') || block.is('loop')) {
        block.forEach('block', function (item, j, itemParent) {
          next = itemParent.get(j - 1);
        });
      }

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
                'message': 'Conditional statement should be on a new line',
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
                'message': 'Following conditional statement should be on current line',
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
