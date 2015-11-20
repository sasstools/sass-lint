'use strict';

var helpers,
    yaml,
    fs,
    path,
    sortBy,
    propertyCheckList,
    orderPresets,
    getOrderConfig,
    sortProperties;

helpers = require('../helpers');
yaml = require('js-yaml');
fs = require('fs');
path = require('path');
sortBy = require('lodash.sortby');

propertyCheckList = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'properties.yml'), 'utf8')).split(' ');

orderPresets = {
  'recess': 'recess.yml',
  'smacss': 'smacss.yml',
  'concentric': 'concentric.yml'
};

getOrderConfig = function (order) {
  var filename,
      orderConfig;

  if (typeof order === 'string' && orderPresets.hasOwnProperty(order)) {
    filename = orderPresets[order];
    orderConfig = helpers.loadConfigFile('property-sort-orders/' + filename);

    return orderConfig.order;
  }

  return false;
};

/**
 * Sorts properties using alphabetical order or based on order array properties.
 *
 * @param {Object[]} properties List of CSS properties.
 * @param {string|string[]} order List of CSS property names.
 * @returns {Object[]} A copy of the properties that is sorted based on the order.
 */
sortProperties = function (properties, order) {
  var sorted;

  if (typeof order === 'string') {
    if (order === 'alphabetical') {
      return sortBy(properties, 'name');
    }

    throw new Error('Unexpected sorting order.');
  }
  else {
    sorted = sortBy(properties, 'name');

    // @see http://jsfiddle.net/vsn32xp3/
    sorted = sortBy(sorted, function (property) {
      var matchIndex;

      matchIndex = order.indexOf(property.name);

      return matchIndex === -1 ? properties.length : matchIndex;
    });

    return sorted;
  }
};

module.exports = {
  'name': 'property-sort-order',
  'defaults': {
    'order': 'alphabetical',
    'ignore-custom-properties': false
  },
  'detect': function (ast, parser) {
    var result = [],
        order = getOrderConfig(parser.options.order) || parser.options.order;

    ast.traverseByType('block', function (block) {
      var properties = [],
          sorted,
          expectedOrder,
          currentOrder;

      if (block) {
        block.forEach('declaration', function (dec) {
          var prop = dec.first('property'),
              name = prop.first('ident');

          if (name) {
            if (parser.options['ignore-custom-properties']) {
              if (propertyCheckList.indexOf(name.content) !== -1) {
                properties.push({
                  name: name.content,
                  line: prop.start.line,
                  column: prop.start.column
                });
              }
            }
            else {
              properties.push({
                name: name.content,
                line: prop.start.line,
                column: prop.start.column
              });
            }
          }


        });

        // console.log('properties', properties);

        // console.log('order', order);

        sorted = sortProperties(properties, order);

        expectedOrder = sorted.map(function (prop) {
          return prop.name;
        }).join(', ');

        currentOrder = properties.map(function (prop) {
          return prop.name;
        }).join(', ');

        // console.log('expectedOrder', expectedOrder);
        // console.log('currentOrder', currentOrder);

        if (expectedOrder !== currentOrder) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column,
            'message': 'Expected "' + expectedOrder + '", found "' + currentOrder + '"',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};
