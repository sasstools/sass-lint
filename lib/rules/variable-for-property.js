'use strict';

var helpers = require('../helpers');

// The whitelisted ident values
var whitelistedValues = ['inherit', 'initial', 'transparent', 'none', 'currentColor'];

/**
 * Checks If the property is of a valid type, either its a variable or it's a whitelisted ident value
 *
 * @param {Object} propertyElem - The property element
 * @returns {boolean} Whether the property is valid or not
 */
var isValidProperty = function (propertyElem) {
  if (propertyElem) {
    if (propertyElem.type === 'variable') {
      return true;
    }
    else if (propertyElem.type === 'ident' && whitelistedValues.indexOf(propertyElem.content) !== -1) {
      return true;
    }
  }
  return false;
};

module.exports = {
  'name': 'variable-for-property',
  'defaults': {
    'properties': []
  },
  'detect': function (ast, parser) {
    var result = [];

    if (parser.options.properties.length) {
      ast.traverseByType('value', function (node, i, parent) {
        var declaration = parent.content[0].content[0],
            declarationType = declaration.type,
            declarationIdent = declaration.content;

        if (declarationType === 'ident') {
          if (parser.options.properties.indexOf(declarationIdent) !== -1) {
            node.forEach(function (valElem) {
              if (!isValidProperty(valElem)) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': declaration.start.line,
                  'column': declaration.start.column,
                  'message': 'Values for properties of type \'' + declarationIdent + '\' may only be variables',
                  'severity': parser.severity
                });
              }
            });
          }
        }
      });
    }
    return result;
  }
};
