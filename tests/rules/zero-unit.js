'use strict';

var lint = require('./_lint');

var file = lint.file('zero-unit.scss');

describe('zero unit', function () {
  it('[include: false]', function (done) {
    lint.test(file, {
      'zero-unit': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'zero-unit': [
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
