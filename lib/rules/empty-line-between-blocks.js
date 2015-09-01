'use strict';

var helpers = require('../helpers');

var findNearestReturn = function (parent, i) {
  var previous,
      doublePrevious,
      space;

  if (i >= 2) {
    doublePrevious = parent.content[i - 2];

    if (doublePrevious.type.indexOf('Comment') !== -1) {
      return findNearestReturn(parent, i - 1);
    }
  }

  if (i >= 1) {
    previous = parent.content[i - 1];

    if (previous.type.indexOf('Comment') !== -1) {
      return findNearestReturn(parent, i - 1);
    }

    if (previous.type === 'space') {
      space = previous.content.indexOf('\n\n') >= 0;

      return {
        'space': space,
        'previous': previous
      };
    }
  }
};

module.exports = {
  'name': 'empty-line-between-blocks',
  'defaults': {
    'include': true
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType(['ruleset'], function (ruleset, i, parent) {
      var space;

      space = findNearestReturn(parent, i);

      if (space) {
	if (parser.options.include && !space.space && i !== 1) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': space.previous.end.line,
            'column': space.previous.end.column,
            'message': 'Space expected between blocks',
            'severity': parser.severity
          });
        }
        else if (!parser.options.include && space.space) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': space.previous.end.line,
            'column': space.previous.end.column,
            'message': 'Space not allowed between blocks',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};
