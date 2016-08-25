'use strict';

var helpers = require('../helpers');

var isUrlRegex = /^(https?:)?\/\//,
    noProtocolRegex = /^(https?:)\/\//;

module.exports = {
  'name': 'no-url-protocols',
  'defaults': {
    'enforce-domains' : true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('uri', function (uri) {
      uri.traverse(function (item) {
        if (item.is('string')) {
          var stripped = helpers.stripQuotes(item.content),
              regexSelector = parser.options['enforce-domains'] ?
                  isUrlRegex : noProtocolRegex,
              message = parser.options['enforce-domains'] ?
                  "Protocols and domains in URLs are disallowed" :
                  "Protocols in URLS are disallowed";

          if (stripped.match(regexSelector)) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'severity': parser.severity,
              'line': item.end.line,
              'column': item.end.column,
              'message': message
            });
          }
        }
      });
    });

    return result;
  }
};
