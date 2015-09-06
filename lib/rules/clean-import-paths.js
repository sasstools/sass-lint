'use strict';

var helpers = require('../helpers');

var stripQuotes = function (str) {
  return str.substring(1, str.length - 1);
};

var getImportPath = function (parent) {
  if (parent.first('string')) {
    return parent.first('string');
  }
  else if (parent.first('uri')) {
    return parent.first('uri');
  }

  return false;
};

module.exports = {
  'name': 'import-path',
  'defaults': {
    'leading-underscore': false,
    'filename-extension': false
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword, i, parent) {
      keyword.traverse(function (item) {
        if (item.content === 'import') {
          var importPathNode = getImportPath(parent);

          if (importPathNode && importPathNode.type === 'string') {
            var importPath = stripQuotes(importPathNode.content),
                filename = helpers.getBasename(importPath),
                fileExtension = helpers.getExtname(filename);

            if (fileExtension !== '.css') {
              if (filename.charAt(0) === '_') {
                if (!parser.options['leading-underscore']) {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': item.start.line,
                    'column': item.start.column,
                    'message': 'Leading underscores are not allowed',
                    'severity': parser.severity
                  });
                }
              }
              else {
                if (parser.options['leading-underscore']) {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': item.start.line,
                    'column': item.start.column,
                    'message': 'Leading underscores are required',
                    'severity': parser.severity
                  });
                }
              }

              if (fileExtension) {
                if (!parser.options['filename-extension']) {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': item.start.line,
                    'column': item.start.column,
                    'message': 'File extensions are not allowed',
                    'severity': parser.severity
                  });
                }
              }
              else {
                if (parser.options['filename-extension']) {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': item.start.line,
                    'column': item.start.column,
                    'message': 'File extensions are required',
                    'severity': parser.severity
                  });
                }
              }
            }
          }
        }
      });
    });

    return result;
  }
};
