'use strict';

var helpers = require('../helpers');

var orderPresets = {
  'recess': 'recess.yml',
  'smacss': 'smacss.yml',
  'concentric': 'concentric.yml'
};

var getOrderConfig = function (order) {
  if (typeof order === 'string') {
    if (orderPresets.hasOwnProperty(order)) {
      var filename = orderPresets[order],
          orderConfig = helpers.loadConfigFile('property-sort-orders/' + filename);

      return orderConfig.order;
    }
  }

  return false;
};

var sortProperties = function (obj, order) {
  var keys = Object.keys(obj),
      unknown = [],
      sorted = {},
      i;

  if (typeof order === 'string') {
    if (order === 'alphabetical') {
      keys = keys.sort();
    }
  }
  else if (typeof order === 'object') {
    var orderedKeys = [];

    for (i = 0; i < order.length; i++) {
      if (keys.indexOf(order[i]) !== -1) {
        orderedKeys.push(order[i]);
      }
    }

    keys = orderedKeys;
  }
  else {
    keys = keys.sort(function (a, b) {
      if (order.indexOf(a) === -1) {
        if (unknown.indexOf(a) === -1) {
          unknown.push(a);
        }
      }
      if (order.indexOf(b) === -1) {
        if (unknown.indexOf(b) === -1) {
          unknown.push(b);
        }
      }

      if (order.indexOf(a) > order.indexOf(b)) {
        return 1;
      }
      if (order.indexOf(a) < order.indexOf(b)) {
        return -1;
      }
      return 0;
    });
  }

  for (i = 0; i < unknown.length; i++) {
    if (keys.indexOf(unknown[i]) !== -1) {
      keys.splice(keys.indexOf(unknown[i]), 1);
    }
  }

  keys = keys.concat(unknown.sort());

  for (i = 0; i < keys.length; i++) {
    sorted[keys[i]] = obj[keys[i]];
  }

  return sorted;
};

var addBlockMismatch = function (parser, result, blockMismatch) {
  var message;
  if (blockMismatch.expected.length === 1) {
    message = 'Expected `' + blockMismatch.expected[0] + '`, found `' + blockMismatch.actual[0] + '`';
  }
  else {
    message = 'Expected order `' + blockMismatch.expected.join(', ') + '`, found `' + blockMismatch.actual.join(', ') + '`';
  }
  return helpers.addUnique(result, {
    'ruleId': parser.rule.name,
    'line': blockMismatch.first.start.line,
    'column': blockMismatch.first.start.column,
    'message': message,
    'severity': parser.severity
  });
};

module.exports = {
  'name': 'property-sort-order',
  'defaults': {
    'order': 'alphabetical',
    'ignore-custom-properties': false,
    'display-mode': 'lines'
  },
  'detect': function (ast, parser) {
    var result = [],
        order = getOrderConfig(parser.options.order) || parser.options.order;

    ast.traverseByType('block', function (block) {
      var properties = {},
          sorted,
          pKeys,
          sKeys;

      if (block) {
        block.forEach('declaration', function (dec) {
          var prop = dec.first('property'),
              name = prop.first('ident');

          if (name) {
            if (parser.options['ignore-custom-properties']) {
              // lazy load our css property list
              const propertyList = require('known-css-properties').all;
              if (propertyList.indexOf(name.content) !== -1) {
                properties[name.content] = prop;
              }
            }
            else {
              properties[name.content] = prop;
            }
          }
        });

        sorted = sortProperties(properties, order);

        pKeys = Object.keys(properties);
        sKeys = Object.keys(sorted);

        var blockMismatch = null;

        sKeys.every(function (e, i) {
          var pKey = pKeys[i],
              prop = properties[pKey];

          if (e !== pKey) {
            if (parser.options['display-mode'] === 'lines') {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': prop.start.line,
                'column': prop.start.column,
                'message': 'Expected `' + e + '`, found `' + pKey + '`',
                'severity': parser.severity
              });
            }
            if (blockMismatch) {
              blockMismatch.expected.push(e);
              blockMismatch.actual.push(pKey);
            }
            else {
              blockMismatch = {
                first: prop,
                expected: [e],
                actual: [pKey]
              };
            }
          }
          else {
            if (blockMismatch) {
              if (parser.options['display-mode'] === 'blocks') {
                result = addBlockMismatch(parser, result, blockMismatch);
              }
              blockMismatch = null;
            }
          }
          return true;
        });
        if (blockMismatch) {
          if (parser.options['display-mode'] === 'blocks') {
            result = addBlockMismatch(parser, result, blockMismatch);
          }
        }
      }
    });

    return result;
  }
};
