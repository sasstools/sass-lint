'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('hex length - scss', function () {
  var file = lint.file('hex-length.scss');

  it('[style: short]', function (done) {
    lint.test(file, {
      'hex-length': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[style: long]', function (done) {
    lint.test(file, {
      'hex-length': [
        1,
        {
          'style': 'long'
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('hex length - sass', function () {
  var file = lint.file('hex-length.sass');

  it('[style: short]', function (done) {
    lint.test(file, {
      'hex-length': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[style: long]', function (done) {
    lint.test(file, {
      'hex-length': [
        1,
        {
          'style': 'long'
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
