'use strict';

var helpers = require('../helpers');

var prefixes = ['webkit', 'moz', 'ms'],
    validPrefixes = [];

var setPrefixes = function () {
  validPrefixes = prefixes.slice();
};

var handleExcludes = function (excludes) {
  excludes.forEach(function (item) {
    var index = validPrefixes.indexOf(item);

    if (index > -1) {
      validPrefixes.splice(index, 1);
    }
  });
};

var handleIncludes = function (includes) {
  includes.forEach(function (item) {
    if (validPrefixes.indexOf(item) === -1) {
      validPrefixes.push(item);
    }
  });
};

var precompileRegEx = function (includes, excludes) {

  if (includes.length) {
    handleIncludes(includes);
  }

  if (excludes.length) {
    handleExcludes(excludes);
  }

  return new RegExp('-(' + validPrefixes.join('|') + ')-');
};

module.exports = {
  'name': 'no-vendor-prefixes',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': []
  },
  'detect': function (ast, parser) {
    setPrefixes();

    var result = [],
        statement = precompileRegEx(parser.options['additional-identifiers'], parser.options['excluded-identifiers']);

    ast.traverseByType('ident', function (value) {
      if (statement.test(value.content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': value.start.line,
          'column': value.start.column,
          'message': 'Vendor prefixes should not be used',
          'severity': parser.severity
        });
      }
    });
    return result;
  }
};
