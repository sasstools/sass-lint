'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no trailing zero - scss', function () {
  var file = lint.file('no-trailing-zero.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'trailing-zero': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no trailing zero - sass', function () {
  var file = lint.file('no-trailing-zero.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'trailing-zero': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});
