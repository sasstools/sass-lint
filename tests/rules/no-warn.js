'use strict';

var lint = require('./_lint');

var file = lint.file('no-warn.scss');

describe('no warn', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-warn': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
