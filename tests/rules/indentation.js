'use strict';

var lint = require('./_lint');

var file = lint.file('indentation.scss');

describe('indentation', function () {
  //////////////////////////////
  // Indentation
  //////////////////////////////
  it('[size: 2]', function (done) {
    lint.test(file, {
      'indentation': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});
