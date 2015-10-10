'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('force element nesting - scss', function () {
  var file = lint.file('force-element-nesting.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'force-element-nesting': 1
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('force element nesting - sass', function () {
  var file = lint.file('force-element-nesting.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'force-element-nesting': 1
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });
});
