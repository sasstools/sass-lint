'use strict';

var lint = require('./_lint');

var file = lint.file('single-line-per-selector.scss');

describe('single line per selector', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'single-line-per-selector': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
