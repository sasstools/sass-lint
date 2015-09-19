'use strict';

var lint = require('./_lint');

describe('url quotes - scss', function () {
  var file = lint.file('url-quotes.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'url-quotes': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

describe('url quotes - sass', function () {
  var file = lint.file('url-quotes.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'url-quotes': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
