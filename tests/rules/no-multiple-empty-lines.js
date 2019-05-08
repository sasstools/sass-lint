'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no multiple empty lines - scss', function () {
  var file = lint.file('no-multiple-empty-lines.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-multiple-empty-lines': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no multiple empty lines - sass', function () {
  var file = lint.file('no-multiple-empty-lines.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-multiple-empty-lines': 1
    }, function (data) {
      lint.assert.equal(11, data.warningCount);
      done();
    });
  });
});
