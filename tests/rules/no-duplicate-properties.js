'use strict';

var lint = require('./_lint');

var file = lint.file('no-duplicate-properties.scss');

describe('no duplicate properties', function () {
 //////////////////////////////
  // Duplicate Property
  //////////////////////////////
  it('enforce', function (done) {
    lint.test(file, {
      'no-duplicate-properties': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
