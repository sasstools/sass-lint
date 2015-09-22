'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no invalid hex - scss', function () {
  var file = lint.file('no-invalid-hex.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-invalid-hex': 1
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no invalid hex - sass', function () {
  var file = lint.file('no-invalid-hex.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-invalid-hex': 1
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });
});
