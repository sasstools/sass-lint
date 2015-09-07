'use strict';

var lint = require('./_lint');

var file = lint.file('placeholder-in-extend.scss');

describe('placeholder in extend', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'placeholder-in-extend': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
