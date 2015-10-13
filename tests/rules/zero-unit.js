'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('zero unit - scss', function () {
  var file = lint.file('zero-unit.scss');

  it('[include: false]', function (done) {
    lint.test(file, {
      'zero-unit': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'zero-unit': [
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
describe('zero unit - sass', function () {
  var file = lint.file('zero-unit.sass');

  it('[include: false]', function (done) {
    lint.test(file, {
      'zero-unit': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'zero-unit': [
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
