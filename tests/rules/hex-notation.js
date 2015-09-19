'use strict';

var lint = require('./_lint');

describe('hex notation', function () {
  //////////////////////////////
  // Hex notation Lowercase - Default
  //////////////////////////////
  it('scss - [style: lowercase]', function (done) {
    var file = lint.file('hex-notation.scss');

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
  it('scss - [style: uppercase]', function (done) {
    var file = lint.file('hex-notation.scss');

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

  //////////////////////////////
  // Hex notation Lowercase - Default
  //////////////////////////////
  it('sass - [style: lowercase]', function (done) {
    var file = lint.file('hex-notation.sass');

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
  it('sass - [style: uppercase]', function (done) {
    var file = lint.file('hex-notation.sass');

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
