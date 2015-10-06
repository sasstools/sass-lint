'use strict';

var lint = require('./_lint');

var file = lint.file('no-url-protocols.scss');

describe('no url protocols', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-url-protocols': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
