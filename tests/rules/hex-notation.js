'use strict';

var lint = require('./_lint');

var file = lint.file('hex-notation.scss');

describe('hex notation', function () {
  //////////////////////////////
  // Hex notation Lowercase - Default
  //////////////////////////////
  it('[style: lowercase]', function (done) {
    lint.test(file, {
      'hex-notation': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Hex Notation Uppercase
  //////////////////////////////
  it('[style: uppercase]', function (done) {
    lint.test(file, {
      'hex-notation': [
        1,
        {
          'style': 'uppercase'
        }
      ]
    }, function (data) {
      lint.assert.equal(7, data.warningCount);
      done();
    });
  });
});
