'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no attribute selector - scss', function () {
  var file = lint.file('no-attribute-selector.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-attribute-selector': 1
    }, function (data) {
      lint.assert.equal(18, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no attribute selector - sass', function () {
  var file = lint.file('no-attribute-selector.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-attribute-selector': 1
    }, function (data) {
      lint.assert.equal(18, data.warningCount);
      done();
    });
  });
});
