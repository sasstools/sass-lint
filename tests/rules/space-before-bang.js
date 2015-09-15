'use strict';

var lint = require('./_lint');

var file = lint.file('space-before-bang.scss');

describe('space before bang', function () {
  it('[include: true]', function (done) {
    lint.test(file, {
      'space-before-bang': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-before-bang': [
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
