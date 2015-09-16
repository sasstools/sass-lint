'use strict';

var lint = require('./_lint');

var file = lint.file('space-after-bang.scss');

describe('space after bang', function () {
  it('[include: false]', function (done) {
    lint.test(file, {
      'space-after-bang': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-after-bang': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
