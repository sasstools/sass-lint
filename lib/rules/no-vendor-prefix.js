'use strict';

var helpers = require('../helpers');

var prefixes = ['webkit', 'moz', 'ms'];

var handleExcludes = function (excludes) {
  excludes.forEach(function (item) {
    var index = prefixes.indexOf(item);

    if (index > -1) {
      prefixes.splice(index, 1);
    }
  });
};

var handleIncludes = function (includes) {
  includes.forEach(function (item) {
    if (prefixes.indexOf(item) === -1) {
      prefixes.push(item);
    }
  });
};

var precompileRegEx = function (includes, excludes) {

  if (excludes.length) {
    handleExcludes(excludes);
  }

  if (includes.length) {
    handleIncludes(includes);
  }

  return new RegExp('-(' + prefixes.join('|') + ')-');
};

module.exports = {
  'name': 'no-vendor-prefix',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': []
  },
  'detect': function (ast, parser) {
    var result = [],
        statement = precompileRegEx(parser.options['additional-identifiers'], parser.options['excluded-identifiers']);

    ast.traverseByType('ident', function (value) {
      if (statement.test(value.content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': value.start.line,
          'column': value.start.column,
          'message': 'Hexadecimal values must be a valid format',
          'severity': parser.severity
        });
      }
    });
    return result;
  }
};
