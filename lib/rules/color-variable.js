'use strict';

var helpers = require('../helpers'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

var colorFunctions = ['rgb', 'rgba', 'hsl', 'hsla'],
    cssColors = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'literals.yml'), 'utf8')).split(' ');

module.exports = {
  'name': 'color-variable',
  'defaults': {
    'style': 'short'
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('value', function (node, i, parent) {
      node.forEach(function (valElem) {

        var declarationType = parent.content[0].content[0].type;
        // check type is color, content isn't a css color literal but also it's not a variable
        if ((valElem.type === 'color' || cssColors.indexOf(valElem.content) !== -1) && valElem.type !== 'variable') {
          if (declarationType === 'ident') {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': node.start.line,
              'column': node.start.column,
              'message': 'color literals such as \'' + valElem.content + '\' should only be used in variable declarations',
              'severity': parser.severity
            });
          }
        }
        else if (valElem.type === 'function') {
          var funcType = valElem.content[0].content;

          if (colorFunctions.indexOf(funcType) !== -1 && declarationType !== 'variable') {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': valElem.start.line,
              'column': valElem.start.column,
              'message': 'color functions such as \'' + funcType + '\' should only be used in variable declarations',
              'severity': parser.severity
            });
          }
          else {
            valElem.content.forEach( function (funcContent) {
              if (funcContent.type === 'arguments') {
                funcContent.forEach(function (funcArgs) {
                  if ((funcArgs.type === 'color' || funcArgs.type === 'ident') && (cssColors.indexOf(funcArgs.content) !== -1 || helpers.isValidHex(funcArgs.content))) {
                    result = helpers.addUnique(result, {
                      'ruleId': parser.rule.name,
                      'line': funcArgs.start.line,
                      'column': funcArgs.start.column,
                      'message': 'color literals such as \'' + funcArgs.content + '\' should not be passed to functions, use variables',
                      'severity': parser.severity
                    });
                  }
                });
              }
            });
          }
        }
        else if (valElem.type === 'parentheses') {
          valElem.traverse( function (mapVals) {
            if (mapVals.type === 'ident' && cssColors.indexOf(mapVals.content) !== -1 ) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': mapVals.start.line,
                'column': mapVals.start.column,
                'message': 'color literals such as \'' + mapVals.content + '\' should not be used as map identifiers',
                'severity': parser.severity
              });
            }
          });
        }
      });
    });
    return result;
  }
};
