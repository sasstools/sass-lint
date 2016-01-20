'use strict';

var assert = require('assert'),
    lint = require('../index');

var lintFile = function lintFile (file, options, cb) {
  cb = cb || options;
  options = options || {};

  var results = lint.lintFiles(process.cwd() + '/tests/sass/' + file, options);

  cb(results[0]);
};

describe('sass lint', function () {
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
