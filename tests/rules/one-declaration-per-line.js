'use strict';

var lint = require('./_lint');

var file = lint.file('one-declaration-per-line.scss');

describe('one declaration per line', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'one-declaration-per-line': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
