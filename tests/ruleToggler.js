var path = require('path'),
    fs = require('fs'),
    groot = require('../lib/groot'),
    ruleToggler = require('../lib/ruleToggler'),
    assert = require('assert'),
    deepEqual = require('deep-equal');

var getToggledRules = ruleToggler.getToggledRules,
    isResultEnabled = ruleToggler.isResultEnabled;

var generateToggledRules = function (filename) {
  var filePath = path.join(process.cwd(), 'tests', 'sass', filename);
  var file = {
    'text': fs.readFileSync(filePath),
    'format': path.extname(filePath).replace('.', ''),
    'filename': path.basename(filePath)
  };
  var ast = groot(file.text, file.format, file.filename);
  return getToggledRules(ast);
};

describe('rule toggling', function () {
  describe('getToggledRules', function () {
    //////////////////////////////
    // SCSS syntax tests
    //////////////////////////////
    it('should allow all rules to be disabled', function () {
      assert(deepEqual(generateToggledRules('ruleToggler-disable-all.scss'), {
        globalEnable: [[false, 1, 1]],
        ruleEnable: {}
      }) === true);
    });
    it('should allow all rules to be disabled then re-enabled', function () {
      var ruleToggles = generateToggledRules('ruleToggler-disable-all-then-reenable.scss');
      assert(deepEqual(ruleToggles, {
        globalEnable: [
          [false, 1, 1],
          [true, 3, 1]
        ],
        ruleEnable: {}
      }) === true);
    });
    it('should allow a single rule to be disabled', function () {
      assert(deepEqual(generateToggledRules('ruleToggler-disable-a-rule.scss'), {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1]]
        }
      }) === true);
    });
    it('should allow multiple rules to be disabled', function () {
      assert(deepEqual(generateToggledRules('ruleToggler-disable-multiple-rules.scss'), {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1]],
          b: [[false, 1, 1]],
          c: [[false, 1, 1]],
          d: [[false, 1, 1]]
        }
      }) === true);
    });
    it('should be able to disable a single line', function () {
      var ruleToggles = generateToggledRules('ruleToggler-disable-a-line.scss');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 2, 1], [true, 3, 1]]
        }
      }) === true);
    });
    it('should be able to disable a block of code', function () {
      var ruleToggles = generateToggledRules('ruleToggler-disable-a-block.scss');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 3], [true, 3, 1]]
        }
      }) === true);
    });
    it('should be able to enable a disabled rule', function () {
      var ruleToggles = generateToggledRules('ruleToggler-disable-then-enable.scss');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 2, 5], [true, 4, 5]]
        }
      }) === true);
    });
    it('should ignore comments that don\'t fit known formats', function () {
      var ruleToggles = generateToggledRules('ruleToggler-ignore-unknown.scss');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {}
      }) === true);
    });
    it('should ignore empty files', function () {
      var ruleToggles = generateToggledRules('empty-file.scss');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {}
      }) === true);
    });
    it('should ignore empty comments', function () {
      var ruleToggles = generateToggledRules('ruleToggler-empty-comment.scss');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {}
      }) === true);
    });
    it('should be ordered', function () {
      var ruleToggles = generateToggledRules('ruleToggler-guarantee-order.scss');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 3],
              [false, 2, 5],
              [true, 6, 1],
              [false, 8, 3],
              [false, 8, 5],
              [true, 12, 1],
              [false, 14, 6],
              [false, 14, 32]]
        }
      }) === true);
    });

    //////////////////////////////
    // SASS syntax tests
    //////////////////////////////
    it('should allow all rules to be disabled', function () {
      assert(deepEqual(generateToggledRules('ruleToggler-disable-all.sass'), {
        globalEnable: [[false, 1, 1]],
        ruleEnable: {}
      }) === true);
    });
    it('should allow all rules to be disabled then re-enabled', function () {
      var ruleToggles = generateToggledRules('ruleToggler-disable-all-then-reenable.sass');
      assert(deepEqual(ruleToggles, {
        globalEnable: [
          [false, 1, 1],
          [true, 3, 1]
        ],
        ruleEnable: {}
      }) === true);
    });
    it('should allow a single rule to be disabled', function () {
      assert(deepEqual(generateToggledRules('ruleToggler-disable-a-rule.sass'), {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1]]
        }
      }) === true);
    });
    it('should allow multiple rules to be disabled', function () {
      assert(deepEqual(generateToggledRules('ruleToggler-disable-multiple-rules.sass'), {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1]],
          b: [[false, 1, 1]],
          c: [[false, 1, 1]],
          d: [[false, 1, 1]]
        }
      }) === true);
    });
    it('should be able to disable a single line', function () {
      var ruleToggles = generateToggledRules('ruleToggler-disable-a-line.sass');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 2, 1], [true, 3, 1]]
        }
      }) === true);
    });
    it('should be able to disable a block of code', function () {
      var ruleToggles = generateToggledRules('ruleToggler-disable-a-block.sass');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 2, 1], [true, 2, 32]]
        }
      }) === true);
    });
    it('should be able to enable a disabled rule', function () {
      var ruleToggles = generateToggledRules('ruleToggler-disable-then-enable.sass');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 2, 5], [true, 4, 5]]
        }
      }) === true);
    });
    it('should ignore comments that don\'t fit known formats', function () {
      var ruleToggles = generateToggledRules('ruleToggler-ignore-unknown.sass');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {}
      }) === true);
    });
    it('should ignore empty files', function () {
      var ruleToggles = generateToggledRules('empty-file.sass');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {}
      }) === true);
    });
    it('should ignore empty comments', function () {
      var ruleToggles = generateToggledRules('ruleToggler-empty-comment.sass');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {}
      }) === true);
    });
    it('should be ordered', function () {
      var ruleToggles = generateToggledRules('ruleToggler-guarantee-order.sass');
      assert(deepEqual(ruleToggles, {
        globalEnable: [],
        ruleEnable: {
          a: [[false, 2, 1],
              [false, 2, 5],
              [true, 5, 20],
              [false, 8, 1],
              [false, 8, 5],
              [true, 11, 20],
              [false, 14, 5],
              [false, 15, 5]]
        }
      }) === true);
    });
  });
  describe('isResultEnabled', function () {
    it('should disable all rules if global is disabled', function () {
      assert(isResultEnabled({
        globalEnable: [[false, 1, 1]],
        ruleEnable: {}
      })({
        ruleId: 'anything',
        line: 2,
        column: 1
      }) === false);
    });
    it('should disable a rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1]]
        }
      })({
        ruleId: 'a',
        line: 2,
        column: 1
      }) === false);
    });
    it('should not disable an unrelated rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          b: [[false, 1, 1]]
        }
      })({
        ruleId: 'a',
        line: 2,
        column: 1
      }) === true);
    });
    it('should support enabling a previously disabled rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1], [true, 2, 1]]
        }
      })({
        ruleId: 'a',
        line: 3,
        column: 1
      }) === true);
    });
    it('should support disabling a previously re-enabled rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1], [true, 2, 1], [false, 3, 1]]
        }
      })({
        ruleId: 'a',
        line: 4,
        column: 1
      }) === false);
    });
    it('should support enabling a previously re-enabled then disabled rule (in enabled part)', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1], [true, 2, 1], [false, 3, 1], [true, 4, 1]]
        }
      })({
        ruleId: 'a',
        line: 5,
        column: 1
      }) === true);
    });
    it('should support enabling a previously re-enabled then disabled rule (in disabled part)', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1], [true, 2, 1], [false, 3, 1], [true, 4, 1]]
        }
      })({
        ruleId: 'a',
        line: 3,
        column: 10
      }) === false);
    });
    it('should support disabling a rule that is later re-enabled', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 1, 1], [true, 3, 1], [false, 4, 1]]
        }
      })({
        ruleId: 'a',
        line: 2,
        column: 1
      }) === false);
    });
  });
});
