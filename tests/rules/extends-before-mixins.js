'use strict';

var lint = require('./_lint');

var file = lint.file('extends-before-mixins.scss');

describe('extends before mixins', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'extends-before-mixins': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
