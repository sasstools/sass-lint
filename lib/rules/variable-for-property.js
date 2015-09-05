'use strict';

var helpers = require('../helpers');

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
              if (valElem.type !== 'variable') {
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
