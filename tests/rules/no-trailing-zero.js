'use strict';

var lint = require('./_lint');

var file = lint.file('no-trailing-zero.scss');

describe('no trailing zero', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'trailing-zero': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
