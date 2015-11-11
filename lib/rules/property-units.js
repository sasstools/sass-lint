'use strict';

var helpers = require('../helpers');


var checkDimension = function (
    propertyName,
    dimension,
    globallyAllowedUnits,
    unitsAllowedForProperties,
    parser,
    result) {
  var dimensionIdent = dimension ? dimension.first('ident') : null,
      unitType = dimensionIdent ? dimensionIdent.content : null,
      unitsAllowedForProperty = unitsAllowedForProperties[propertyName];
  // If a property is defined in unitsAllowedForProperty, then it will only validate those unit types
  if (unitType && unitsAllowedForProperty) {
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
};

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
      var property = declaration.first('property'),
          ident = property ? property.first('ident') : null,
          hasVariable = ident ? null : !!property.first('variable'),
          propertyName = ident ? ident.content : null,
          valueNode = declaration.first('value'),
          hasDimension = valueNode ? !!valueNode.first('dimension') : null,
          hasFunction = valueNode ? !!valueNode.first('function') : null;
      if (!propertyName && hasVariable) {
        if (globallyAllowedUnits.length) {
          // dimensions inside variables should match globallyAllowedUnits if defined
          declaration.traverse(function (dimension) {
            // sadly traverseTree isn't available here, so this filter will have to do
            if (dimension.type !== 'dimension') {
              return;
            }
            var dimensionIdent = dimension ? dimension.first('ident') : null,
                unitType = dimensionIdent ? dimensionIdent.content : null;
            if (unitType && globallyAllowedUnits.indexOf(unitType) === -1) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'severity': parser.severity,
                'line': dimension.start.line,
                'column': dimension.start.column,
                'message': 'Values in variables may not use ' + unitType + ' units'
              });
            }
          });
        }
      }
      else if (propertyName && hasDimension) {
        // properties such as box-shadow may have multiple dimensions defined so enumerate through them
        valueNode.forEach('dimension', function (dimension) {
          return checkDimension(propertyName,
            dimension,
            globallyAllowedUnits,
            unitsAllowedForProperties,
            parser,
            result
          );
        });
      }
      else if (propertyName && hasFunction) {
        var functionNode = valueNode.first('function'),
            argumentsNode = functionNode.first('arguments');
        // for functions, we'll just check the arguments for dimensions
        argumentsNode.forEach('dimension', function (dimension) {
          return checkDimension(propertyName,
            dimension,
            globallyAllowedUnits,
            unitsAllowedForProperties,
            parser,
            result
          );
        });
      }
    });
    return result;
  }
};
