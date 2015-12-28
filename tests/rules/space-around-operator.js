'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('space around operator - scss', function () {
  var file = lint.file('space-around-operator.scss');

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-around-operator': 1
    }, function (data) {
      lint.assert.equal(83, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-around-operator': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(77, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('space around operator - sass', function () {
  var file = lint.file('space-around-operator.sass');

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-around-operator': 1
    }, function (data) {
      lint.assert.equal(83, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-around-operator': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(77, data.warningCount);
      done();
    });
  });
});
