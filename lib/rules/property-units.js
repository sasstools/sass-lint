'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'property-units',
  'defaults': {
    'units-allowed-for-properties': {},
    'globally-allowed-units': []
  },
  'detect': function (ast, parser) {
    var result = [],
        globallyAllowedUnits = parser.options['globally-allowed-units'],
        unitsAllowedForProperties = parser.options['units-allowed-for-properties'];

    ast.traverseByType('declaration', function (declaration) {
      //                  declaration -> property? -> ident?
      var property = declaration.first('property'),
          ident = property ? property.first('ident') : null,
          propertyName = ident ? ident.content : null,
          valueNode = declaration.first('value'),
          dimension = valueNode ? valueNode.first('dimension') : null,
          dimensionIdent = dimension ? dimension.first('ident') : null,
          unitType = dimensionIdent ? dimensionIdent.content : null;
      if (propertyName && unitType) {
        var unitsAllowedForProperty = unitsAllowedForProperties[propertyName];
        // If a property is defined in unitsAllowedForProperty, then it will only validate those unit types
        if (unitsAllowedForProperty) {
          if (unitsAllowedForProperty.indexOf(unitType) === -1) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'severity': parser.severity,
              'line': dimension.start.line,
              'column': dimension.start.column,
              'message': 'Values for property \'' + propertyName + '\' may not use ' + unitType + ' units'
            });
          }
        }
        // If no units are defined in globallyAllowedUnits, then allow all of them
        // Otherwise, verify the given unit is in the globallyAllowedUnits list.
        else if (unitType && globallyAllowedUnits.length && globallyAllowedUnits.indexOf(unitType) === -1) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'severity': parser.severity,
            'line': dimension.start.line,
            'column': dimension.start.column,
            'message': 'Values for property \'' + propertyName + '\' may not use ' + unitType + ' units'
          });
        }
      }
    });
    return result;
  }
};
