'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no domains - scss', function () {
  var file = lint.file('no-domains.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-domains': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no domains - sass', function () {
  var file = lint.file('no-domains.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-domains': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
