'use strict';

var lint = require('./_lint');

var file = lint.file('space-after-comma.scss');

describe('space after comma', function () {
  it('[include: true]', function (done) {
    lint.test(file, {
      'space-after-comma': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-after-comma': [
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
