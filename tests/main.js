'use strict';

var assert = require('assert'),
    lint = require('../index');

var lintFile = function lintFile (file, options, cb) {
  cb = cb || options;
  options = options || {};

  var results = lint.lintFiles(process.cwd() + '/tests/sass/' + file, options);

  cb(results[0]);
};

var lintFiles = function lintFiles (files, options, configPath, cb) {
  options = options || {};
  var results = lint.lintFiles(files, options, configPath);

  cb(results);
};

var resultsObj = [{
  filePath: 'app/scss/echo-base/defaults/utilities/_mixins.scss',
  warningCount: 3,
  errorCount: 0,
  messages: [{
    ruleId: 'no-vendor-prefixes',
    line: 120,
    column: 8,
    message: 'Vendor prefixes should not be used',
    severity: 1
  }, {
    ruleId: 'no-vendor-prefixes',
    line: 130,
    column: 8,
    message: 'Vendor prefixes should not be used',
    severity: 1
  }, {
    ruleId: 'no-vendor-prefixes',
    line: 140,
    column: 8,
    message: 'Vendor prefixes should not be used',
    severity: 1
  }]
}, {
  filePath: 'app/scss/main.scss',
  warningCount: 0,
  errorCount: 2,
  messages: [{
    ruleId: 'no-ids',
    line: 52,
    column: 1,
    message: 'ID selectors not allowed',
    severity: 2
  }, {
    ruleId: 'no-ids',
    line: 57,
    column: 1,
    message: 'ID selectors not allowed',
    severity: 2
  }]
}];

var multiInputResults = [{
  filePath: 'tests/cli/cli-error.sass',
  warningCount: 1,
  errorCount: 0,
  messages: [{
    ruleId: 'no-ids',
    line: 1,
    column: 1,
    message: 'ID selectors not allowed',
    severity: 1
  }]
}, {
  filePath: 'tests/cli/cli-error.scss',
  warningCount: 1,
  errorCount: 0,
  messages: [{
    ruleId: 'no-ids',
    line: 1,
    column: 1,
    message: 'ID selectors not allowed',
    severity: 1
  }]
}];

describe('sass lint', function () {

// ==============================================================================
//  Not Error on Empty Files
// ==============================================================================

  it('should not error if a file is empty', function (done) {
    lintFile('empty-file.scss', function (data) {
      assert.equal(0, data.warningCount);
      assert.equal(0, data.errorCount);
      assert.equal(0, data.messages.length);
      done();
    });
  });

// ==============================================================================
//  Parse Errors should return as lint errors
// ==============================================================================

  it('Parse Errors should return as lint errors', function (done) {
    lintFile('parse.scss', function (data) {
      assert.equal(1, data.errorCount);
      done();
    });
  });

  it('Parse Errors should not include warnings too', function (done) {
    lintFile('parse.scss', function (data) {
      assert.equal(0, data.warningCount);
      done();
    });
  });

  it('Parse Errors should return as severity 2', function (done) {
    lintFile('parse.scss', function (data) {
      var severity = data.messages[0].severity;

      assert.equal(2, severity);
      done();
    });
  });

  it('Parse Errors should return the correct error message', function (done) {
    lintFile('parse.scss', function (data) {
      var message = data.messages[0].message,
          expected = 'Please check validity of the block starting from line #5';

      assert.equal(expected, message);
      done();
    });
  });

  it('Parse Errors should return the rule ID \'Fatal\'', function (done) {
    lintFile('parse.scss', function (data) {
      var ruleId = data.messages[0].ruleId,
          expected = 'Fatal';

      assert.equal(expected, ruleId);
      done();
    });
  });
});

// ==============================================================================
//  Lint files with config path
// ==============================================================================

describe('sassLint Config load', function () {
  it('should accept multiple input sources in a config', function (done) {
    lintFiles(null, {}, 'tests/yml/.multiple-inputs.yml', function (data) {
      assert.deepEqual(data, multiInputResults);
      done();
    });
  });

  it('should accept multiple input sources and ignores in a config', function (done) {
    lintFiles(null, {}, 'tests/yml/.multiple-ignores.yml', function (data) {
      assert.deepEqual(data, []);
      done();
    });
  });
});

describe('sassLint detect counts', function () {

// ==============================================================================
//  Error Count
// ==============================================================================

  it('should equal 2 errors', function (done) {
    var result = lint.errorCount(resultsObj);

    assert.equal(2, result.count);
    done();
  });

// ==============================================================================
//  Warning count
// ==============================================================================

  it('should equal 3 warnings', function (done) {
    var result = lint.warningCount(resultsObj);

    assert.equal(3, result.count);
    done();
  });

// ==============================================================================
//  Result count
// ==============================================================================

  it('should equal 5 overall detects', function (done) {
    var result = lint.resultCount(resultsObj);

    assert.equal(5, result);
    done();
  });
});
