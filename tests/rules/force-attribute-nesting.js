'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('force attribute nesting - scss', function () {
  var file = lint.file('force-attribute-nesting.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'force-attribute-nesting': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('force attribute nesting - sass', function () {
  var file = lint.file('force-attribute-nesting.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'force-attribute-nesting': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});
