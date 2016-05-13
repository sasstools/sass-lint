'use strict';

var assert = require('assert'),
    equal = require('deep-equal'),
    lint = require('../index'),
    fs = require('fs');

var lintFile = function lintFile (file, options, cb) {
  cb = cb || options;
  options = options || {};

  var results = lint.lintFiles(process.cwd() + '/tests/sass/' + file, options);

  cb(results[0]);
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
var emptyResult = {
  filePath: 'tests/cli/cli.scss',
  warningCount: 0,
  errorCount: 0,
  messages: []
};
var oneWarningResult = {
  filePath: 'tests/cli/cli.scss',
  warningCount: 1,
  errorCount: 0,
  messages: [
    {
      ruleId: 'no-color-literals',
      line: 2,
      column: 10,
      message: 'Color literals such as \'red\' should only be used in variable declarations',
      severity: 1
    }
  ]
};


describe('sassLint', function () {
  describe('default functionality', function () {
    //////////////////////////////
    // Not Error on Empty Files
    //////////////////////////////
    it('should not error if a file is empty', function (done) {
      lintFile('empty-file.scss', function (data) {
        assert.equal(0, data.warningCount);
        assert.equal(0, data.errorCount);
        assert.equal(0, data.messages.length);
        done();
      });
    });

    //////////////////////////////
    // Parse Errors should return as lint errors
    //////////////////////////////
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


  describe('detect counts', function () {
    //////////////////////////////
    // Error count
    //////////////////////////////
    it('should equal 2 errors', function (done) {
      var result = lint.errorCount(resultsObj);

      assert.equal(2, result.count);
      done();
    });

    //////////////////////////////
    // Warning count
    //////////////////////////////
    it('should equal 3 warnings', function (done) {
      var result = lint.warningCount(resultsObj);

      assert.equal(3, result.count);
      done();
    });

    //////////////////////////////
    // Result count
    //////////////////////////////
    it('should equal 5 overall detects', function (done) {
      var result = lint.resultCount(resultsObj);

      assert.equal(5, result);
      done();
    });
  });

  //////////////////////////////
  // lintFileText
  //////////////////////////////

  describe('lintFileText', function () {
    var file;
    var fileObj;

    beforeEach(function () {
      file = fs.readFileSync('tests/cli/cli.scss');
      fileObj = {
        'text': file,
        'format': 'scss',
        'filename': 'tests/cli/cli.scss'
      };
    });

    it('should ignore a file from the ignore section of a config file', function (done) {
      var result = lint.lintFileText(fileObj, {}, 'tests/yml/.ignore-file.yml');
      assert(
        equal(
          result,
          emptyResult,
          {
            'strict': true
          }
        )
      );
      done();
    });

    it('should lint a file from when no ignores are specified', function (done) {
      var result = lint.lintFileText(fileObj, {}, 'tests/yml/.no-merge-default.yml');
      assert(
        equal(
          result,
          oneWarningResult,
          {
            'strict': true
          }
        )
      );
      done();
    });
  });
});
