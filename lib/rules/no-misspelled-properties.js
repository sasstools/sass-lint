'use strict';

var helpers = require('../helpers'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

var properties = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'properties.yml'), 'utf8')).split(' ');

/**
 * Get all valid properties
 *
 * @param {Array} props - The list of default valid properties
 * @param {Array} extras - The user specified list of valid properties
 * @returns {Array} Combined list
 */
var getCombinedList = function (props, extras) {
  return Object.assign([], props, extras);
};

/**
 * Check for partial match
 *
 * @param {string} prop - The prop to validate
 * @param {Array} props - Array of valid properties
 * @returns {Boolean} Whether prop partially matches list or not
 */
var isPartialStringMatch = function (prop, props) {
  for (var i = 0; i < props.length; i++) {
    if (props[i].indexOf(prop) >= 0) {
      return true;
    }
  }

  return false;
};

module.exports = {
  'name': 'no-misspelled-properties',
  'defaults': {
    'extra-properties': []
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('property', function (node) {
      if (node.first().is('ident')) {
        var curProperty = node.first().content,
            propertyList = getCombinedList(properties, parser.options['extra-properties']);

        if (curProperty.charAt(0) === '-') {
          curProperty = helpers.stripPrefix(curProperty);
        }

        if (isPartialStringMatch(curProperty, propertyList)) {
          return false;
        }

        if (curProperty.length > 0) {
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
