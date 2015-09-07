'use strict';

var lint = require('./_lint');

var file = lint.file('space-between-parens.scss');

describe('space between parens', function () {
  it('[include: false]', function (done) {
    lint.test(file, {
      'space-between-parens': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});
