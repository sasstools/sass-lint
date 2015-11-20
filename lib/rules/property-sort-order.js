'use strict';

var helpers,
    yaml,
    fs,
    path,
    sortBy,
    clone,
    propertyCheckList,
    orderPresets,
    getOrderConfig,
    sortProperties,
    trimGroupSeparator,
    validateSeparation,
    GROUP_SEPARATOR;

GROUP_SEPARATOR = '(group separator)';

helpers = require('../helpers');
yaml = require('js-yaml');
fs = require('fs');
path = require('path');
sortBy = require('lodash.sortby');
clone = require('lodash.clone');

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

trimGroupSeparator = function (subject) {
  if (!subject.length) {
    return subject;
  }

  if (subject[0] === GROUP_SEPARATOR) {
    subject.shift();

    return trimGroupSeparator(subject);
  }

  if (subject[subject.length - 1] === GROUP_SEPARATOR) {
    subject.pop();

    return trimGroupSeparator(subject);
  }

  return subject;
};

validateSeparation = function (parser, block, expectedPropertyOrder) {
  var blockProperties;

  blockProperties = [];

  block.forEach(function (dec) {
    var prop,
        name;

    if (dec.type === 'declaration') {
      prop = dec.first('property');
      name = prop.first('ident');

      if (!name) {
        return;
      }

      if (parser.options['ignore-custom-properties'] && propertyCheckList.indexOf(name.content) === -1) {
        return;
      }

      blockProperties.push(name.content);
    }

    if (dec.type === 'space' && dec.content.indexOf('\n\n') === 0) {
      blockProperties.push(GROUP_SEPARATOR);
    }
  });

  expectedPropertyOrder = clone(expectedPropertyOrder);

  // First remove expectedPropertyOrder properties that do not appear in blockProperties.
  expectedPropertyOrder = expectedPropertyOrder.filter(function (propertyName) {
    if (propertyName === GROUP_SEPARATOR) {
      return true;
    }

    return blockProperties.indexOf(propertyName) !== -1;
  });

  expectedPropertyOrder = trimGroupSeparator(expectedPropertyOrder);

  // Then do the inverse with blockProperties.
  blockProperties = blockProperties.filter(function (propertyName) {
    if (propertyName === GROUP_SEPARATOR) {
      return true;
    }

    return expectedPropertyOrder.indexOf(propertyName) !== -1;
  });

  blockProperties = trimGroupSeparator(blockProperties);

  blockProperties = blockProperties.join(', ');
  expectedPropertyOrder = expectedPropertyOrder.join(', ');

  if (blockProperties !== expectedPropertyOrder) {
    return {
      'ruleId': parser.rule.name,
      'line': block.start.line,
      'column': block.start.column,
      'message': 'Expected "' + expectedPropertyOrder + '", found "' + blockProperties + '"',
      'severity': parser.severity
    };
  }

  return null;
};

module.exports = {
  'name': 'property-sort-order',
  'defaults': {
    'order': 'alphabetical',
    'ignore-custom-properties': false
  },
  'detect': function (ast, parser) {
    var result = [],
        validateSeparationResult,
        order = getOrderConfig(parser.options.order) || parser.options.order;

    ast.traverseByType('block', function (block) {
      var properties = [],
          sorted,
          expectedOrder,
          currentOrder;

      if (!block) {
        return;
      }

      block.forEach('declaration', function (dec) {
        var prop = dec.first('property'),
            name = prop.first('ident');

        if (!name) {
          return;
        }

        if (parser.options['ignore-custom-properties'] && propertyCheckList.indexOf(name.content) === -1) {
          return;
        }

        properties.push({
          name: name.content,
          line: prop.start.line,
          column: prop.start.column
        });
      });

      sorted = sortProperties(properties, order);

      expectedOrder = sorted.map(function (prop) {
        return prop.name;
      }).join(', ');

      currentOrder = properties.map(function (prop) {
        return prop.name;
      }).join(', ');

      if (expectedOrder !== currentOrder) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': block.start.line,
          'column': block.start.column,
          'message': 'Expected "' + expectedOrder + '", found "' + currentOrder + '"',
          'severity': parser.severity
        });
      } else {
        if (typeof order === 'object') {
          validateSeparationResult = validateSeparation(parser, block, order);

          if (validateSeparationResult) {
            result = helpers.addUnique(result, validateSeparationResult);
          }
        }
      }
    });

    return result;
  }
};
