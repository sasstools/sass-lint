'use strict';

var lint = require('./_lint');

var file = lint.file('url-quotes.scss');

describe('url quotes', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'url-quotes': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
