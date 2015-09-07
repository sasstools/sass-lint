'use strict';

var lint = require('./_lint');

var file = lint.file('no-invalid-hex.scss');

describe('no invalid hex', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-invalid-hex': 1
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });
});
