'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('space after bang - scss', function () {
  var file = lint.file('space-after-bang.scss');

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-after-bang': 1
    }, function (data) {
      lint.assert.equal(7, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-after-bang': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(7, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('space after bang - sass', function () {
  var file = lint.file('space-after-bang.sass');

  it('sass - [include: false]', function (done) {
    lint.test(file, {
      'space-after-bang': 1
    }, function (data) {
      lint.assert.equal(7, data.warningCount);
      done();
    });
  });

  it('sass - [include: true]', function (done) {
    lint.test(file, {
      'space-after-bang': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(7, data.warningCount);
      done();
    });
  });
});
