'use strict';

var lint = require('./_lint');

describe('hex length', function () {
  //////////////////////////////
  // Hex Length Short - Default
  //////////////////////////////
  it('scss - [style: short]', function (done) {
    var file = lint.file('hex-length.scss');

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
  it('scss - [style: long]', function (done) {
    var file = lint.file('hex-length.scss');

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

  //////////////////////////////
  // Hex Length Short - Default
  //////////////////////////////
  it('sass - [style: short]', function (done) {
    var file = lint.file('hex-length.sass');

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
  it('sass - [style: long]', function (done) {
    var file = lint.file('hex-length.sass');

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
