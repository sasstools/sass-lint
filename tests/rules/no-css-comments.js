'use strict';

var lint = require('./_lint');

var file = lint.file('no-css-comments.scss');

describe('no css comments', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-css-comments': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
