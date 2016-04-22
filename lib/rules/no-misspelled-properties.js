'use strict';

var helpers = require('../helpers'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

var properties = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../data', 'properties.yml'), 'utf8')).split(' ');

module.exports = {
  'name': 'no-misspelled-properties',
  'defaults': {
    'extra-properties': []
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('property', function (node) {
      if (node.first().is('ident')) {
        var curProperty = node.first().content;

        if (curProperty.charAt(0) === '-') {
          curProperty = helpers.stripPrefix(curProperty);
        }

        if (curProperty.length > 0 && properties.indexOf(curProperty) === -1 && parser.options['extra-properties'].indexOf(curProperty) === -1) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Property `' + curProperty + '` appears to be spelled incorrectly',
            'severity': parser.severity
          });
        }
      }
    });
    return result;
  }
};
