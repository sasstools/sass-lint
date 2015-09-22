'use strict';

var helpers = require('../helpers'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

var colorFunctions = ['rgb', 'rgba', 'hsl', 'hsla'],
    cssColors = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'literals.yml'), 'utf8')).split(' ');

var getColorFunctionsCopy = function (colorFunctionsArr) {
  return colorFunctionsArr.slice();
};

module.exports = {
  'name': 'no-color-literals',
  'defaults': {
    'allow-rgba': false
  },
  'detect': function (ast, parser) {
    var result = [],
        validColorFunctions = getColorFunctionsCopy(colorFunctions);

    if (parser.options['allow-rgba'] && validColorFunctions.indexOf('rgba') !== -1) {
      validColorFunctions.splice(validColorFunctions.indexOf('rgba'), 1);
    }

    ast.traverseByType('value', function (node, i, parent) {
      node.forEach(function (valElem) {
        var declarationType = parent.content[0].content[0].type;

        // check type is color, content isn't a css color literal but also it's not a variable
        if ((valElem.type === 'color' || cssColors.indexOf(valElem.content) !== -1) && valElem.type !== 'variable') {
          if (declarationType === 'ident') {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': valElem.start.line,
              'column': valElem.start.column,
              'message': 'Color literals such as \'' + valElem.content + '\' should only be used in variable declarations',
              'severity': parser.severity
            });
          }
        }

        // if not a color value or a variable then check if it's a function
        else if (valElem.type === 'function') {
          var funcType = valElem.content[0].content;

          // check it's not a blacklisted color function and even if it is that it's not assigned to a variable
          if (validColorFunctions.indexOf(funcType) !== -1 && declarationType !== 'variable') {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': valElem.start.line,
              'column': valElem.start.column,
              'message': 'Color functions such as \'' + funcType + '\' should only be used in variable declarations',
              'severity': parser.severity
            });
          }

          // if rgba usage is allowed we need to make sure only variables are being passed to it.
          else if (parser.options['allow-rgba'] && funcType === 'rgba' && valElem.content[1].content[0].type !== 'variable' && declarationType !== 'variable' ) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': valElem.start.line,
              'column': valElem.start.column,
              'message': 'A color in variable form must be passed to rgba, literals are restricted',
              'severity': parser.severity
            });
          }

          // if a non color function we should check it's arguments
          else {
            valElem.content.forEach( function (funcContent) {
              if (funcContent.type === 'arguments') {
                funcContent.forEach(function (funcArgs) {

                  // if the arguments are not functions themselves
                  if (funcArgs.type !== 'function') {

                    // check if the argument types are therefore color literals
                    if ((funcArgs.type === 'color' || funcArgs.type === 'ident') && (cssColors.indexOf(funcArgs.content) !== -1 || helpers.isValidHex(funcArgs.content))) {
                      result = helpers.addUnique(result, {
                        'ruleId': parser.rule.name,
                        'line': funcArgs.start.line,
                        'column': funcArgs.start.column,
                        'message': 'Color literals such as \'' + funcArgs.content + '\' should not be passed to functions, use variables',
                        'severity': parser.severity
                      });
                    }
                  }

                  // if the argument is a function itself
                  else {

                    // loop its arguments
                    funcArgs.forEach( function (nestedFuncArgs) {

                      // check again for color literals or blacklisted color functions
                      if (
                        (nestedFuncArgs.type === 'color' || nestedFuncArgs.type === 'ident' || nestedFuncArgs.type === 'function') &&
                        (cssColors.indexOf(nestedFuncArgs.content) !== -1 || helpers.isValidHex(nestedFuncArgs.content) || validColorFunctions.indexOf(nestedFuncArgs.content) !== -1 )
                      ) {
                        result = helpers.addUnique(result, {
                          'ruleId': parser.rule.name,
                          'line': nestedFuncArgs.start.line,
                          'column': nestedFuncArgs.start.column,
                          'message': 'Color functions such as \'' + nestedFuncArgs.content + '\' should not be passed to functions, use variables',
                          'severity': parser.severity
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        }

        // if a map / list check to see if it's property names are the same as color literals - this is bad
        else if (valElem.type === 'parentheses') {
          valElem.traverse( function (mapVals) {
            if (mapVals.type === 'ident' && cssColors.indexOf(mapVals.content) !== -1 ) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': mapVals.start.line,
                'column': mapVals.start.column,
                'message': 'Color literals such as \'' + mapVals.content + '\' should not be used as map identifiers',
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
