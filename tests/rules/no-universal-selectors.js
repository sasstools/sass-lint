'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no universal selectors - scss', function () {
  var file = lint.file('no-universal-selectors.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-universal-selectors': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no universal selectors - sass', function () {
  var file = lint.file('no-universal-selectors.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-universal-selectors': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});
