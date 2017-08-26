'use strict';

var helpers = require('../helpers');
var properties = require('known-css-properties').all;
var PROP_DIVIDER = '-';
/**
 * Combine the valid property array and the array of extras into a new array
 *
 * @param {Array} props - The list of default valid properties
 * @param {Array} extras - The user specified list of valid properties
 * @returns {Array} Combined list
 */
var getCombinedList = function (props, extras) {
  return props.concat(extras);
};

var buildPartialProperty = function (valBlock, currentProperty, propsCounted) {
  var propList = [];
  var propsEncountered = propsCounted;
  if (valBlock.contains('declaration')) {
    valBlock.forEach('declaration', function (node) {
      var prop = node.first('property');
      var value = node.first('value');
      propsEncountered++;

      if (prop.first().is('ident')) {
        if (value.contains('block')) {
          propList = propList.concat(
            buildPartialProperty(value.first('block'),
              {
                name: currentProperty.name + PROP_DIVIDER + prop.first('ident').content
              },
              propsEncountered
            )
          );
        }
        else {
          propList.push({
            name: currentProperty.name + PROP_DIVIDER + prop.first('ident').content,
            line: prop.first().start.line,
            col: prop.first().start.column,
            propsEncountered: propsEncountered
          });
        }
      }
    });
  }
  return propList;
};

module.exports = {
  'name': 'no-misspelled-properties',
  'defaults': {
    'extra-properties': []
  },
  'detect': function (ast, parser) {
    var result = [];
    var toSkip = 0;
    var propertyList = getCombinedList(properties, parser.options['extra-properties']);

    ast.traverseByType('declaration', function (node) {
      var prop = node.first('property');
      var containsInterp = prop.contains('interpolation');
      if (toSkip) {
        toSkip--;
        if (toSkip) {
          return false;
        }
      }
      if (!prop.first() || !prop.first().is('ident')) {
        return false;
      }
      var curProperty = prop.first() && prop.first().is('ident') && prop.first('ident').content;
      var value = node.first('value');
      var fullProperties = [];

      if (value.contains('block')) {
        fullProperties = buildPartialProperty(
          value.first('block'),
          {
            name: curProperty,
            line: prop.first('ident').start.line,
            col: prop.first('ident').start.column
          },
          0
        );
      }

      if (fullProperties.length) {
        fullProperties.forEach(function (constrProp) {
          toSkip += constrProp.propsEncountered;
          if (propertyList.indexOf(constrProp.name) === -1) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': constrProp.line,
              'column': constrProp.col,
              'message': 'Property `' + constrProp.name + '` appears to be spelled incorrectly',
              'severity': parser.severity
            });
          }
        });
      }
      else {
        if (curProperty.length > 0) {
          if (containsInterp) {
            if (!helpers.isPartialStringMatch(curProperty, propertyList)) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': node.start.line,
                'column': node.start.column,
                'message': 'Property `' + curProperty + '` appears to be spelled incorrectly',
                'severity': parser.severity
              });
            }
          }
          else if (propertyList.indexOf(curProperty) === -1) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': node.start.line,
              'column': node.start.column,
              'message': 'Property `' + curProperty + '` appears to be spelled incorrectly',
              'severity': parser.severity
            });
          }
        }
      }
      return false;
    });
    return result;
  }
};
