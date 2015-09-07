'use strict';

var lint = require('./_lint');

var file = lint.file('no-debug.scss');

describe('no debug', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-debug': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
