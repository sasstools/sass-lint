'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('leading zero - scss', function () {
  var file = lint.file('leading-zero.scss');

  it('[include: false]', function (done) {
    lint.test(file, {
      'leading-zero': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'leading-zero': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('leading zero - scss', function () {
  var file = lint.file('leading-zero.sass');

  it('[include: false]', function (done) {
    lint.test(file, {
      'leading-zero': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'leading-zero': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
