'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no url domains - scss', function () {
  var file = lint.file('no-url-domains.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-url-domains': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no url domains - sass', function () {
  var file = lint.file('no-url-domains.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-url-domains': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
