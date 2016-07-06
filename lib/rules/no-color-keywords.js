'use strict';

var helpers = require('../helpers'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

var cssColors = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'literals.yml'), 'utf8')).split(' ');

/**
 * Checks if a node's parent is a valid type as we dont want to apply
 * this rule to function names or variable names
 *
 * @param {Object} node - The parent node to test
 * @returns {boolean} Whether the node is a valid type or not
 */
var checkValidParentType = function (node) {
  if (node) {
    return node.type === 'function' || node.type === 'variable';
  }

  return false;
};

module.exports = {
  'name': 'no-color-keywords',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];
    ast.traverseByType('value', function (node) {
      node.traverse(function (elem, i, parent) {
<<<<<<< HEAD
        var isVariable = false;
        if (parent) {
          if (parent.type === 'variable') {
            isVariable = true;
          }
        }

        if (elem.type === 'ident' && !isVariable) {
=======
        if (elem.type === 'ident' && !checkValidParentType(parent)) {
>>>>>>> 6f5a5096f7a8e63bffbe9bd817fceefe0d0c28c2
          var index = cssColors.indexOf(elem.content.toLowerCase());

          if (index !== -1) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': elem.start.line,
              'column': elem.start.column,
              'message': 'Color \'' + elem.content + '\' should be written in its hexadecimal form #' + cssColors[index + 1],
              'severity': parser.severity
            });
          }
        }
      });

    });
    return result;
  }
};

module.exports.fix = function (groot) {
  groot.traverseByType('value', function (n) {
    n.traverseByTypes('ident', function (_n, _i, _p) {
      if (!_p.is('variable')) {
        var j = cssColors.indexOf(_n.content.toLowerCase());
        if (j !== -1) {
          _n.content = _n.content.replace(new RegExp('(' + cssColors.join('|') + ')'), '#' + cssColors[j + 1]);
        }
      }
    });
  });
};
