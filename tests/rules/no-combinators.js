'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no combinators - scss', function () {
  var file = lint.file('no-combinators.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-combinators': 1
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no combinators - sass', function () {
  var file = lint.file('no-combinators.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-combinators': 1
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
      done();
    });
  });
});
