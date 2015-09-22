'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no color keywords - scss', function () {
  var file = lint.file('no-color-keywords.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-color-keywords': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no color keywords - sass', function () {
  var file = lint.file('no-color-keywords.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-color-keywords': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});
