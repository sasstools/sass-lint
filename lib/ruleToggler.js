'use strict';

var addDisable = function (toggledRules, rules, line, column) {
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    toggledRules.ruleEnable[rule].push([false, line, column]);
  });
};

var addEnable = function (toggledRules, rules, line, column) {
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    toggledRules.ruleEnable[rule].push([true, line, column]);
  });
};

var getBoundsOfContainingBlock = function (blockChild) {
  if (blockChild.type === 'block') {
    return {
      start: {
        line: blockChild.start.line,
        column: blockChild.start.column
      },
      end: {
        line: blockChild.end.line,
        column: blockChild.end.column
      }
    };
  }
  // TODO: not sure what the appropriate behavior is if there is no parent block; currently NPEs
  return getBoundsOfContainingBlock(blockChild.parent);
};

var addDisableBlock = function (toggledRules, rules, blockChild) {
  var blockBounds = getBoundsOfContainingBlock(blockChild);
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    toggledRules.ruleEnable[rule]
      .push([false, blockBounds.start.line, blockBounds.start.column])
      .push([true, blockBounds.end.line, blockBounds.end.column]);
  });
};

var addDisableAll = function (toggledRules, line, column) {
  toggledRules.globalEnable
    .push([false, line, column]);
};

var addEnableAll = function (toggledRules, line, column) {
  toggledRules.globalEnable
    .push([true, line, column]);
};

var addDisableLine = function (toggledRules, rules, line) {
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    // NOTE: corner case not handled here: a 2nd disable inside an ignored line, which is unrealistically pathological.
    toggledRules.ruleEnable[rule]
      .push([false, line, 0])
      .push([true, line + 2, 0]);
  });
};

var sortRange = function (toggleRangeA, toggleRangeB) {
  var aLine = toggleRangeA[1],
      aCol = toggleRangeA[2],
      bLine = toggleRangeB[1],
      bCol = toggleRangeA[2];
  if (aLine < bLine) {
    return -1;
  }
  if (bLine < aLine) {
    return 1;
  }
  if (aCol < bCol) {
    return -1;
  }
  if (bCol < aCol) {
    return 1;
  }
  return 0;
};

module.exports.getToggledRules = function (ast) {
  var toggledRules = {
    ruleEnable: {
      // Format in here is [isDisabled, line, column]
    },
    globalEnable: []
  };
  if (!ast.traverseByTypes) {
    return toggledRules;
  }
  ast.traverseByTypes(['multilineComment', 'singlelineComment'], function (comment) {
    var content = comment.content;
    if (!content) {
      return;
    }
    var tokens = content.split(/[\s,]/);
    if (!tokens.length) {
      return;
    }
    var first = tokens[0],
        rules = tokens.splice(1);
    switch (first) {
    case 'sass-lint:disable':
      addDisable(toggledRules, rules, comment.end.line, comment.end.column);
      break;
    case 'sass-lint:enable':
      addEnable(toggledRules, rules, comment.end.line, comment.end.column);
      break;
    case 'sass-lint:disable-block':
      addDisableBlock(toggledRules, rules, comment);
      break;
    case 'sass-lint:disable-all':
      addDisableAll(toggledRules, comment.end.line, comment.end.column);
      break;
    case 'sass-lint:enable-all':
      addEnableAll(toggledRules, comment.end.line, comment.end.column);
      break;
    case 'sass-lint:disable-line':
      addDisableLine(toggledRules, rules, comment.line);
      break;
    default:
      return;
    }
  });
  // Sort these toggle stacks so reading them is easier (algorithmically).
  // Hopefully it's a bubble sort cause they will generally be ordered and tiny.
  toggledRules.globalEnable.sort(sortRange);
  Object.keys(toggledRules.ruleEnable).map(function (ruleId) {
    toggledRules.ruleEnable[ruleId].sort(sortRange);
  });
  return toggledRules;
};

module.exports.isResultEnabled = function (toggledRules) {
  return function (ruleResult) {
    var ruleId = ruleResult.ruleId;
    // Convention: if no column or line, assume rule is targetting 0.
    var line = ruleResult.line || 0;
    var column = ruleResult.column || 0;
    var isGloballyEnabled = toggledRules.globalEnable
      .reduce(function (acc, toggleRange) {
        if (line <= toggleRange[1] && column <= toggleRange[2]) {
          return acc;
        }
        return toggleRange[0];
      }, true);
    if (!isGloballyEnabled) {
      return false;
    }
    if (!toggledRules.ruleEnable[ruleId]) {
      return true;
    }
    var isRuleEnabled = toggledRules.ruleEnable[ruleId]
      .reduce(function (acc, toggleRange) {
        if (line <= toggleRange[1] && column <= toggleRange[2]) {
          return acc;
        }
        return toggleRange[0];
      }, true);
    if (!isRuleEnabled) {
      return false;
    }
    return true;
  };
};

