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

var addDisableBlock = function (toggledRules, rules, block) {
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    toggledRules.ruleEnable[rule].push([false, block.start.line, block.start.column]);
    toggledRules.ruleEnable[rule].push([true, block.end.line, block.end.column]);
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
    toggledRules.ruleEnable[rule].push([false, line, 1]);
    toggledRules.ruleEnable[rule].push([true, line + 1, 1]);
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
  ast.traverseByTypes(['multilineComment', 'singlelineComment'], function (comment, i, parent) {
    var content = comment.content;
    if (!content) {
      return;
    }
    var tokens = content.split(/[\s,]+/)
      .filter(function (s) {
        return s.trim().length > 0;
      });
    if (!tokens.length) {
      return;
    }
    var first = tokens[0],
        rules = tokens.slice(1);
    switch (first) {
    case 'sass-lint:disable':
      addDisable(toggledRules, rules, comment.start.line, comment.start.column);
      break;
    case 'sass-lint:enable':
      addEnable(toggledRules, rules, comment.start.line, comment.start.column);
      break;
    case 'sass-lint:disable-block':
      // TODO: not sure what the appropriate behavior is if there is no parent block; currently NPEs
      addDisableBlock(toggledRules, rules, parent);
      break;
    case 'sass-lint:disable-all':
      addDisableAll(toggledRules, comment.start.line, comment.start.column);
      break;
    case 'sass-lint:enable-all':
      addEnableAll(toggledRules, comment.start.line, comment.start.column);
      break;
    case 'sass-lint:disable-line':
      addDisableLine(toggledRules, rules, comment.start.line);
      break;
    default:
      return;
    }
  });
  // Sort these toggle stacks so reading them is easier (algorithmically).
  toggledRules.globalEnable.sort(sortRange);
  Object.keys(toggledRules.ruleEnable).map(function (ruleId) {
    toggledRules.ruleEnable[ruleId].sort(sortRange);
  });
  return toggledRules;
};

var isBeforeOrSame = function (x, y, x2, y2) {
  return x < x2 || (x === x2 && y < y2);
};

module.exports.isResultEnabled = function (toggledRules) {
  return function (ruleResult) {
    var ruleId = ruleResult.ruleId;
    // Convention: if no column or line, assume rule is targetting 1.
    var line = ruleResult.line || 1;
    var column = ruleResult.column || 1;
    var isGloballyEnabled = toggledRules.globalEnable
      .reduce(function (acc, toggleRange) {
        return isBeforeOrSame(line, column, toggleRange[1], toggleRange[2])
          ? acc
          : toggleRange[0];
      }, true);
    if (!isGloballyEnabled) {
      return false;
    }
    if (!toggledRules.ruleEnable[ruleId]) {
      return true;
    }
    var isRuleEnabled = toggledRules.ruleEnable[ruleId]
      .reduce(function (acc, toggleRange) {
        return isBeforeOrSame(line, column, toggleRange[1], toggleRange[2])
          ? acc
          : toggleRange[0];
      }, true);
    if (!isRuleEnabled) {
      return false;
    }
    return true;
  };
};
