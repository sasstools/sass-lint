'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no css comments - scss', function () {
  var file = lint.file('no-css-comments.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-css-comments': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no css comments - sass', function () {
  var file = lint.file('no-css-comments.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-css-comments': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
