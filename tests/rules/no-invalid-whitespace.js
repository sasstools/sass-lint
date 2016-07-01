'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no invalid whitespace - scss', function () {
  var file = lint.file('no-invalid-whitespace.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-invalid-whitespace': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no invalid whitespace - sass', function () {
  var file = lint.file('no-invalid-whitespace.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-invalid-whitespace': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
