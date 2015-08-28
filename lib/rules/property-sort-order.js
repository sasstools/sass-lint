'use strict';

var helpers = require('../helpers');

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

module.exports = {
  'name': 'property-sort-order',
  'defaults': {
    'order': 'alphabetical'
  },
  'detect': function (ast, parser) {
    var result = [];

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
            properties[name.content] = prop;
          }
        });

        sorted = sortProperties(properties, parser.options.order);
        pKeys = Object.keys(properties);
        sKeys = Object.keys(sorted);

        sKeys.every(function (e, i) {
          var pKey = pKeys[i],
              prop = properties[pKey];

          if (e !== pKey) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': prop.start.line,
              'column': prop.start.column,
              'message': 'Expected `' + e + '`, found `' + pKey + '`',
              'severity': parser.severity
            });
          }
          return true;
        });
      }
    });

    return result;
  }
};
