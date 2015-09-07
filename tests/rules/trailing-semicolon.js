'use strict';

var lint = require('./_lint');

var file = lint.file('trailing-semicolon.scss');

describe('trailing semicolon', function () {
  it('[include: true]', function (done) {
    lint.test(file, {
      'trailing-semicolon': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
