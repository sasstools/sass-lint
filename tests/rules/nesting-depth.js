'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('nesting depth - scss', function () {
  var file = lint.file('nesting-depth.scss');

  it('[max-depth: 2]', function (done) {
    lint.test(file, {
      'nesting-depth': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('nesting depth - sass', function () {
  var file = lint.file('nesting-depth.sass');

  it('[max-depth: 2]', function (done) {
    lint.test(file, {
      'nesting-depth': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
