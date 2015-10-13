'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('single line per selector - scss', function () {
  var file = lint.file('single-line-per-selector.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'single-line-per-selector': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('single line per selector - sass', function () {
  var file = lint.file('single-line-per-selector.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'single-line-per-selector': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});
