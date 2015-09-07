'use strict';

var lint = require('./_lint');

var file = lint.file('space-after-colon.scss');

describe('space after colon', function () {
 //////////////////////////////
  // Space After Colon
  //////////////////////////////

  // Default
  it('[include: true]', function (done) {
    lint.test(file, {
      'space-after-colon': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-after-colon': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
