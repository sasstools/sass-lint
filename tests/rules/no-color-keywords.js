'use strict';

var lint = require('./_lint');

var file = lint.file('no-color-keywords.scss');

describe('no color keywords', function () {
  //////////////////////////////
  // Color Keyword
  //////////////////////////////
  it('enforce', function (done) {
    lint.test(file, {
      'no-color-keywords': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});
