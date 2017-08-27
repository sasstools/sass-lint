'use strict';

var helpers = require('../helpers');
var properties = require('known-css-properties').all;

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

/**
 * Combines the base property name with the current property name to correct a full property name
 *
 * @param {String} baseName - The base property name
 * @param {String} name - The property name to append to our base property name
 * @returns {String} The constructed property name
 */
var generateName = function (baseName, name) {
  return baseName + '-' + name;
};

/**
 * Recursive function to build up an array of property names when encountering multiline properties
 *
 * @param {Object} valBlock - The current block node from within our value
 * @param {Object} currentProperty - The current base property name i.e. border-
 * @param {Number} propsCounted - The number of properties encountered in our multiline so far
 * @returns {Array} Array of objects containing our property and line/col info etc
 */
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
                name: generateName(currentProperty.name, prop.first('ident').content)
              },
              propsEncountered
            )
          );
        }
        else {
          propList.push({
            name: generateName(currentProperty.name, prop.first('ident').content),
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
      // If we've already checked declarations in a multiline we can skip those decs here
      if (toSkip) {
        toSkip--;
        return !toSkip;
      }
      // make sure our first node within our property is an ident
      if (!prop.first() || !prop.first().is('ident')) {
        return false;
      }

      var curProperty = prop.first() && prop.first().is('ident') && prop.first('ident').content;
      var value = node.first('value');
      var fullProperties = [];

      if (value.contains('block')) {
        // encountered a multiline property, we should build the property list here
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
      // If we have multiline properties
      if (fullProperties.length) {
        fullProperties.forEach(function (constrProp) {
          // Add the number of property declarations we've already checked here so we can skip them
          toSkip += constrProp.propsEncountered;
          // Check if the property exists in our list
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
      else if (curProperty && curProperty.length) {
        /*
         * If our property name contains interpolation we need to make a best guess by using a
         * partial string match as we can't be 100% on the context
         */
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
        // Otherwise it's just a normal string property name, lets check it here
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
      return false;
    });

    return result;
  }
};
