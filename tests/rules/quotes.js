'use strict';

var lint = require('./_lint');

var file = lint.file('quotes.scss');

describe('quotes', function () {
  it('[style: single]', function (done) {
    lint.test(file, {
      'quotes': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
