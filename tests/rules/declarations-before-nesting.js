'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('declarations before nesting - scss', function () {
  var file = lint.file('declarations-before-nesting.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'declarations-before-nesting': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('declarations before nesting - sass', function () {
  var file = lint.file('declarations-before-nesting.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'declarations-before-nesting': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
