'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'property-units',
  'defaults': {
    'unitsAllowedForProperties': {},
    'globallyAllowedUnits': []
  },
  'detect': function (ast, parser) {
    var result = [];
    var globallyAllowedUnits = parser.options.globallyAllowedUnits;
    var unitsAllowedForProperties = parser.options.unitsAllowedForProperties;

    ast.traverseByType('declaration', function (declaration) {
      var declarationType = declaration.content[0].content[0].type,
          propertyName = declaration.content[0].content[0].content,
          valueNode = declaration.content
            .filter(function (node) {
              return node.type === 'value';
            })[0];
      if (declarationType === 'ident' && valueNode.content[0].type === 'dimension') {
        var dimensionNode = valueNode.content[0];
        var unitType = dimensionNode.content[1].content;
        var unitsAllowedForProperty = unitsAllowedForProperties[propertyName];
        // If a property is defined in unitsAllowedForProperty, then it will only validate those unit types
        if (unitsAllowedForProperty) {
          if (unitsAllowedForProperty.indexOf(unitType) === -1) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'severity': parser.severity,
              'line': dimensionNode.start.line,
              'column': dimensionNode.start.column,
              'message': 'values for property \'' + propertyName + '\' may not use ' + unitType + ' units'
            });
          }
        }
        // If no units are defined in globallyAllowedUnits, then allow all of them
        // Otherwise, verify the given unit is in the globallyAllowedUnits list.
        else if (globallyAllowedUnits.length && globallyAllowedUnits.indexOf(unitType) === -1) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'severity': parser.severity,
            'line': dimensionNode.start.line,
            'column': dimensionNode.start.column,
            'message': 'values for property \'' + propertyName + '\' may not use ' + unitType + ' units'
          });
        }
      }
    });
    return result;
  }
};
