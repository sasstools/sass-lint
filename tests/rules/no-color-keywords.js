'use strict';

var lint = require('./_lint');

describe('no color keywords - scss', function () {
  it('enforce', function (done) {
    var file = lint.file('no-color-keywords.scss');

    lint.test(file, {
      'no-color-keywords': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});

describe('no color keywords - sass', function () {
  it('enforce', function (done) {
    var file = lint.file('no-color-keywords.sass');

    lint.test(file, {
      'no-color-keywords': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});
