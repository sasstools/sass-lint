'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no excessive empty lines - scss', function () {
  var file = lint.file('no-excessive-empty-lines.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-excessive-empty-lines': 1
    }, function (data) {
      lint.assert.equal(15, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no excessive empty lines - sass', function () {
  var file = lint.file('no-excessive-empty-lines.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-excessive-empty-lines': 1
    }, function (data) {
      lint.assert.equal(15, data.warningCount);
      done();
    });
  });
});
