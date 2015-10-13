'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('brace style - scss', function () {
  var file = lint.file('brace-style.scss');

  it('[style: 1tbs, allow-single-line: true]', function (done) {
    lint.test(file, {
      'brace-style': 1
    }, function (data) {
      lint.assert.equal(30, data.warningCount);
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
      lint.assert.equal(49, data.warningCount);
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
      lint.assert.equal(28, data.warningCount);
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
      lint.assert.equal(47, data.warningCount);
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
      lint.assert.equal(32, data.warningCount);
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
      lint.assert.equal(51, data.warningCount);
      done();
    });
  });
});
