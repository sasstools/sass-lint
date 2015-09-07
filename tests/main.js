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
});
