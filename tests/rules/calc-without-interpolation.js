
'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('calc without interpolation - scss', function () {
  var file = lint.file('calc-without-interpolation.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'calc-without-interpolation': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('calc without interpolation - sass', function () {
  var file = lint.file('calc-without-interpolation.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'calc-without-interpolation': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
