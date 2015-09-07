'use strict';

var lint = require('./_lint');

var file = lint.file('no-important.scss');

describe('no important', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-important': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
