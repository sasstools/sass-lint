'use strict';

var lint = require('./_lint');

var file = lint.file('leading-zero.scss');

describe('leading zero', function () {
  it('[include: false]', function (done) {
    lint.test(file, {
      'leading-zero': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'leading-zero': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
