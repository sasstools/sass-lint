'use strict';

var lint = require('./_lint');

var file = lint.file('border-zero.scss');

describe('border zero', function () {
  it('[convention: 0]', function (done) {
    lint.test(file, {
      'border-zero': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[convention: \'none\']', function (done) {
    lint.test(file, {
      'border-zero': [
        1,
        {
          'convention': 'none'
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
