'use strict';

var lint = require('./_lint');

var file = lint.file('no-extends.scss');

describe('no extends', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-extend': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
