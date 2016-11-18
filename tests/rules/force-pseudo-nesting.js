'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('force pseudo nesting - scss', function () {
  var file = lint.file('force-pseudo-nesting.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'force-pseudo-nesting': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('force pseudo nesting - sass', function () {
  var file = lint.file('force-pseudo-nesting.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'force-pseudo-nesting': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});
