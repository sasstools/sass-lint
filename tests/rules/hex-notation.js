'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('hex notation - scss', function () {
  var file = lint.file('hex-notation.scss');

  it('[style: lowercase]', function (done) {
    lint.test(file, {
      'hex-notation': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

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

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('hex notation - sass', function () {
  var file = lint.file('hex-notation.sass');

  it('[style: lowercase]', function (done) {
    lint.test(file, {
      'hex-notation': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

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
