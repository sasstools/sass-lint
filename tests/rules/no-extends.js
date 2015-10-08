'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no extends - scss', function () {
  var file = lint.file('no-extends.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-extends': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no extends - sass', function () {
  var file = lint.file('no-extends.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-extends': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
