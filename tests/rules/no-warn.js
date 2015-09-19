'use strict';

var lint = require('./_lint');

describe('no warn - scss', function () {
  var file = lint.file('no-warn.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-warn': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});

describe('no warn - sass', function () {
  var file = lint.file('no-warn.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-warn': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
