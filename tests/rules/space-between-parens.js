'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('space between parens - scss', function () {
  var file = lint.file('space-between-parens.scss');

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-between-parens': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-between-parens': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('space between parens - sass', function () {
  var file = lint.file('space-between-parens.sass');

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-between-parens': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-between-parens': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});
