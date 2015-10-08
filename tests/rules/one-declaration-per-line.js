'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('one declaration per line - scss', function () {
  var file = lint.file('one-declaration-per-line.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'one-declaration-per-line': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
