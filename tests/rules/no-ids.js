'use strict';

var lint = require('./_lint');

var file = lint.file('no-ids.scss');

describe('no ids', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-ids': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
