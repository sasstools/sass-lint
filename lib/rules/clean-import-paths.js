'use strict';

var helpers = require('../helpers');

var stripQuotes = function (str) {
  return str.substring(1, str.length - 1);
};

var getFilename = function (path) {
  return path.split('/').pop().split('\\').pop();
};

var getExtension = function (filename) {
  var lastIndex = filename.lastIndexOf('.');

  if (lastIndex < 1) {
    return false;
  }

  return filename.substr(lastIndex + 1);
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
  'name': 'clean-import-paths',
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
                filename = getFilename(importPath),
                fileExtension = getExtension(filename);

            if (fileExtension !== 'css') {
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
