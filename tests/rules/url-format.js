'use strict';

var lint = require('./_lint');

var file = lint.file('url-format.scss');

describe('url format', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'url-format': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
