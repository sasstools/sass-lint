'use strict';

var helpers = require('../helpers');

/**
 * Get number of BEM elements in
 * @param   {string}  str String representing a class selector
 * @returns {integer}     Number of BEM elements in str
 */
var bemDepth = function (str) {
  var elements = str.split('__').length;

  if (elements >= 2) {
    return elements - 1;
  }

  return 0;
};

module.exports = {
  'name': 'bem-depth',
  'defaults': {
    'max-depth': 1
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByTypes(['ruleset', 'placeholder'], function (node) {
      var name,
          depth,
          selectorAndExtensions,
          maxDepth = parser.options['max-depth'];

      if (node.is('placeholder')) {
        name = node.first('ident') && node.first('ident').content;
        depth = bemDepth(name);

        if (name && depth > maxDepth) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': ['Placeholder \'%', name, '\' should have ', maxDepth, ' or fewer BEM elements, but ',
              depth, ' were found.'].join(''),
            'severity': parser.severity
          });
        }
      }
      else {
        selectorAndExtensions = helpers.collectSuffixExtensions(node, 'class');

        selectorAndExtensions.forEach(function (selector) {
          name = selector.content;
          depth = bemDepth(name);

          if (depth > maxDepth) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': selector.start.line,
              'column': selector.start.column,
              'message': ['Selector \'.', name, '\' should have ', maxDepth, ' or fewer BEM elements, but ',
                depth, ' were found.'].join(''),
              'severity': parser.severity
            });
          }
        });
      }
    });

    return result;
  }
};
