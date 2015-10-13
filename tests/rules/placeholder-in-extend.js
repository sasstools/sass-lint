'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('placeholder in extend - scss', function () {
  var file = lint.file('placeholder-in-extend.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'placeholder-in-extend': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('placeholder in extend - sass', function () {
  var file = lint.file('placeholder-in-extend.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'placeholder-in-extend': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
