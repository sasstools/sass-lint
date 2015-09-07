'use strict';

var lint = require('./_lint');

var file = lint.file('nesting-depth.scss');

describe('nesting depth', function () {
  //////////////////////////////
  // Nesting Depth
  //////////////////////////////
  it('[max-depth: 2]', function (done) {
    lint.test(file, {
      'nesting-depth': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
