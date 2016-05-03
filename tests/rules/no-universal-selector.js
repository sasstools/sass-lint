'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no universal-selector - scss', function () {
  var file = lint.file('no-universal-selector.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-universal-selector': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no universal-selector - sass', function () {
  var file = lint.file('no-universal-selector.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-universal-selector': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});
