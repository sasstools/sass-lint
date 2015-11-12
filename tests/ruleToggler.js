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

describe.only('rule toggling', function () {
  describe('getToggledRules', function () {
    it('should allow all rules to be disabled', function () {
      deepEqual(generateToggledRules('ruleToggler-disable-all.scss'), {
        globalEnable: [[false, 0, 0]],
        ruleEnable: {}
      });
    });
    it('should allow all rules to be disabled then re-enabled', function () {
      deepEqual(generateToggledRules('ruleToggler-disable-all-then-reenable.scss'), {
        globalEnable: [[false, 0, 0], [false, 1, 0]],
        ruleEnable: {}
      });
    });
  });
  describe('isResultEnabled', function () {
    it('should disable all rules if global is disabled', function () {
      assert(isResultEnabled({
        globalEnable: [[false, 0, 0]],
        ruleEnable: {}
      })({
        ruleId: 'anything',
        line: 1,
        column: 0
      }) === false);
    });
    it('should disable a rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 0, 0]]
        }
      })({
        ruleId: 'a',
        line: 1,
        column: 0
      }) === false);
    });
    it('should not disable an unrelated rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          b: [[false, 0, 0]]
        }
      })({
        ruleId: 'a',
        line: 1,
        column: 0
      }) === true);
    });
    it('should support enabling a previously disabled rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 0, 0], [true, 1, 0]]
        }
      })({
        ruleId: 'a',
        line: 2,
        column: 0
      }) === true);
    });
    it('should support disabling a previously re-enabled rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 0, 0], [true, 1, 0], [false, 2, 0]]
        }
      })({
        ruleId: 'a',
        line: 3,
        column: 0
      }) === false);
    });
    it('should support enabling a previously re-enabled then disabled rule', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 0, 0], [true, 1, 0], [false, 2, 0], [true, 3, 0]]
        }
      })({
        ruleId: 'a',
        line: 4,
        column: 0
      }) === true);
    });
    it('should support disabling a rule that is later re-enabled', function () {
      assert(isResultEnabled({
        globalEnable: [],
        ruleEnable: {
          a: [[false, 0, 0], [true, 2, 0], [false, 3, 0]]
        }
      })({
        ruleId: 'a',
        line: 1,
        column: 0
      }) === false);
    });
  });
});
