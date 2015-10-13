'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('space before colon - scss', function () {
  var file = lint.file('space-before-colon.scss');

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-before-colon': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-before-colon': [
        1,
        {
          'include': true
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
describe('space before colon - sass', function () {
  var file = lint.file('space-before-colon.sass');

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-before-colon': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-before-colon': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
