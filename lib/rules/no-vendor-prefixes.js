'use strict';

var helpers = require('../helpers');

var prefixes = ['webkit', 'moz', 'ms'];

var getPrefixCopy = function (prefixArr) {
  return prefixArr.slice();
};

var handleExcludes = function (prefixArr, excludes) {
  excludes.forEach(function (item) {
    var index = prefixArr.indexOf(item);

    if (index > -1) {
      prefixArr.splice(index, 1);
    }
  });

  return prefixArr;
};

var handleIncludes = function (prefixArr, includes) {
  includes.forEach(function (item) {
    if (prefixArr.indexOf(item) === -1) {
      prefixArr.push(item);
    }
  });

  return prefixArr;
};

var precompileRegEx = function (prefixArr, includes, excludes) {
  if (includes.length) {
    prefixArr = handleIncludes(prefixArr, includes);
  }

  if (excludes.length) {
    prefixArr = handleExcludes(prefixArr, excludes);
  }

  return new RegExp('-(' + prefixArr.join('|') + ')-');
};

module.exports = {
  'name': 'no-vendor-prefixes',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': []
  },
  'detect': function (ast, parser) {

    var result = [],
        validPrefixes = getPrefixCopy(prefixes),
        statement = precompileRegEx(validPrefixes, parser.options['additional-identifiers'], parser.options['excluded-identifiers']);

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
