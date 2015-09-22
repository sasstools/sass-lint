'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('space after colon - scss', function () {
  var file = lint.file('space-after-colon.scss');

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-after-colon': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-after-colon': [
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
describe('space after colon - sass', function () {
  var file = lint.file('space-after-colon.sass');

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-after-colon': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-after-colon': [
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
