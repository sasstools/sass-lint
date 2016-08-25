'use strict';

var helpers = require('../helpers');
var url = require('url');

var stripQuotes = function (str) {
  return str.substring(1, str.length - 1);
};

module.exports = {
  'name': 'no-domains',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('uri', function (uri) {
      uri.traverse(function (item) {
        if (item.is('string')) {
          var stripped = stripQuotes(item.content),
              parsedUrl = url.parse(stripped, false, true);

          if (parsedUrl.host) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'severity': parser.severity,
              'line': item.end.line,
              'column': item.end.column,
              'message': 'Domains in URLs are disallowed'
            });
          }
        }
      });
    });

    return result;
  }
};
