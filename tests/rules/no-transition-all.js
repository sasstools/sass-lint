'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no transition all - scss', function () {
  var file = lint.file('no-transition-all.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-transition-all': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no transition all - sass', function () {
  var file = lint.file('no-transition-all.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-transition-all': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});
