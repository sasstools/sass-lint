'use strict';

var helpers = require('../helpers');

const countOccurences = function (str, substr) {
  return str.split(substr).length - 1;
};

const checkNodeForEmptyness = function (node) {
  if (node.type !== 'space') {
    return false;
  }

  return countOccurences(node.content, '\n') > 1;
};

const addError = function (result, parser, message, line) {
  return helpers.addUnique(result, {
    'ruleId': parser.rule.name,
    'line': line,
    'column': 1,
    message,
    'severity': parser.severity
  });
};

const multipleConsecutiveError = function (result, parser, line) {
  return addError(result, parser, 'Multiple consecutive empty lines not allowed', line);
};

const startOfBlockError = function (result, parser, line) {
  return addError(result, parser, 'Empty lines at start of block not allowed', line);
};

const endOfBlockError = function (result, parser, line) {
  return addError(result, parser, 'Empty lines at end of block not allowed', line);
};

module.exports = {
  'name': 'no-excessive-empty-lines',
  'defaults': {
    'allow-consecutive': false,
    'allow-at-block-end': false,
    'allow-at-block-start': false,
  },
  'detect': function (ast, parser) {
    let result = [];

    if (!parser.options['allow-consecutive']) {
      const source = ast.toString();
      const re = /^\n\n+/gm;
      let m = null;
      do {
        m = re.exec(source);
        if (m) {
          const lineNumber = source
            .substr(0, m.index)
            .split('\n').length;

          result = multipleConsecutiveError(result, parser, lineNumber);
        }
      } while (m);
    }

    const forbidAtStart = !parser.options['allow-at-block-start'];
    const forbidAtEnd = !parser.options['allow-at-block-end'];

    if (forbidAtStart || forbidAtEnd) {
      ast.traverseByType('block', function (node) {
        if (!Array.isArray(node.content) || node.content.length < 1) {
          return true;
        }

        if (ast.syntax === 'scss') {
          if (forbidAtStart) {
            if (checkNodeForEmptyness(node.content[0])) {
              result = startOfBlockError(result, parser, node.start.line + 1);
            }
          }

          if (forbidAtEnd) {
            const n = node.content[node.content.length - 1];
            if (checkNodeForEmptyness(n)) {
              result = endOfBlockError(result, parser, n.start.line + 1);
            }
          }
        }
        else if (ast.syntax === 'sass') {
          if (forbidAtStart) {
            if (node.content[0].type === 'space' &&
              countOccurences(node.content[0].content, '\n')) {
              result = startOfBlockError(result, parser, node.start.line);
            }
          }
        }

        return true;
      });
    }

    if (!parser.options['allow-at-block-end']) {
      ast.traverseByType('block', function (node) {
        if (!Array.isArray(node.content) || node.content.length < 1) {
          return true;
        }

        if (node.content[0].type !== 'space') {
          return true;
        }

        if (countOccurences(node.content[0].content, '\n') > 1) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line + 1,
            'column': 1,
            'message': 'Empty lines at end of block not allowed',
            'severity': parser.severity
          });
        }

        return true;
      });
    }

    return result;
  }
};
