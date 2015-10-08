'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('space before bang - scss', function () {
  var file = lint.file('space-before-bang.scss');

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-before-bang': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-before-bang': [
        1,
        {
          'include': false
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
describe('space before bang - sass', function () {
  var file = lint.file('space-before-bang.sass');

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-before-bang': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-before-bang': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
