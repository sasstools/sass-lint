'use strict';

var lint = require('./_lint');

var file = lint.file('hex-length.scss');

describe('hex length', function () {
  //////////////////////////////
  // Hex Length Short - Default
  //////////////////////////////
  it('[style: short]', function (done) {
    lint.test(file, {
      'hex-length': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex Length Long
  //////////////////////////////
  it('[style: long]', function (done) {
    lint.test(file, {
      'hex-length': [
        1,
        {
          'style': 'long'
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
