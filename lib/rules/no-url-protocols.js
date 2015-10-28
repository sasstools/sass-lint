'use strict';

var helpers = require('../helpers');

var isUrlRegex = /^(https?:)?\/\//;

var stripQuotes = function (str) {
  return str.substring(1, str.length - 1);
};

module.exports = {
  'name': 'no-url-protocols',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('uri', function (uri) {
      uri.traverse(function (item) {
        if (item.is('string')) {
          var stripped = stripQuotes(item.content);

          if (stripped.match(isUrlRegex)) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'severity': parser.severity,
              'line': item.end.line,
              'column': item.end.column,
              'message': 'Protocols and domains in URLs are disallowed'
            });
          }
        }
      });
    });

    return result;
  }
};
