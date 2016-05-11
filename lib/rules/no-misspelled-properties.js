'use strict';

var helpers = require('../helpers'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

var properties = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'properties.yml'), 'utf8')).split(' ');

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

        if (helpers.isPartialStringMatch(curProperty, propertyList)) {
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
