'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('extends before mixins - scss', function () {
  var file = lint.file('extends-before-mixins.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'extends-before-mixins': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('extends before mixins - sass', function () {
  var file = lint.file('extends-before-mixins.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'extends-before-mixins': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
