'use strict';

var lint = require('./_lint');

describe('extends before declarations - scss', function () {
  var file = lint.file('extends-before-declarations.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'extends-before-declarations': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});

describe('extends before declarations - sass', function () {
  var file = lint.file('extends-before-declarations.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'extends-before-declarations': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
