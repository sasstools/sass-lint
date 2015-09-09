'use strict';

var lint = require('./_lint');

var file = lint.file('brace-style.scss');

describe('brace style', function () {
  it('[style: 1tbs, allow-single-line: true]', function (done) {
    lint.test(file, {
      'brace-style': 1
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[style: 1tbs, allow-single-line: false]', function (done) {
    lint.test(file, {
      'brace-style': [
        1,
        {
          'style': '1tbs',
          'allow-single-line': false
        }
      ]
    }, function (data) {
      lint.assert.equal(39, data.warningCount);
      done();
    });
  });

  it('[style: stroustrup, allow-single-line: true]', function (done) {
    lint.test(file, {
      'brace-style': [
        1,
        {
          'style': 'stroustrup',
          'allow-single-line': true
        }
      ]
    }, function (data) {
      lint.assert.equal(18, data.warningCount);
      done();
    });
  });

  it('[style: stroustrup, allow-single-line: false]', function (done) {
    lint.test(file, {
      'brace-style': [
        1,
        {
          'style': 'stroustrup',
          'allow-single-line': false
        }
      ]
    }, function (data) {
      lint.assert.equal(37, data.warningCount);
      done();
    });
  });

  it('[style: allman, allow-single-line: true]', function (done) {
    lint.test(file, {
      'brace-style': [
        1,
        {
          'style': 'allman',
          'allow-single-line': true
        }
      ]
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
      done();
    });
  });

  it('[style: allman, allow-single-line: false]', function (done) {
    lint.test(file, {
      'brace-style': [
        1,
        {
          'style': 'allman',
          'allow-single-line': false
        }
      ]
    }, function (data) {
      lint.assert.equal(42, data.warningCount);
      done();
    });
  });
});
