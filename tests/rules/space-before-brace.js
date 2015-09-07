'use strict';

var lint = require('./_lint');

var file = lint.file('space-before-brace.scss');

describe('space before brace', function () {
  it('[include: true]', function (done) {
    lint.test(file, {
      'space-before-brace': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
