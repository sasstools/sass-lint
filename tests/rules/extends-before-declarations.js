'use strict';

var lint = require('./_lint');

var file = lint.file('extends-before-declarations.scss');

describe('extends before declarations', function () {
  //////////////////////////////
  // Extends Before Declaration
  //////////////////////////////
  it('enforce', function (done) {
    lint.test(file, {
      'extends-before-declarations': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
