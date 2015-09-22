'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('border zero - scss', function () {
  var file = lint.file('border-zero.scss');

  it('[convention: 0]', function (done) {
    lint.test(file, {
      'border-zero': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[convention: \'none\']', function (done) {
    lint.test(file, {
      'border-zero': [
        1,
        {
          'convention': 'none'
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('border zero - sass', function () {
  var file = lint.file('border-zero.sass');

  it('[convention: 0]', function (done) {
    lint.test(file, {
      'border-zero': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[convention: \'none\']', function (done) {
    lint.test(file, {
      'border-zero': [
        1,
        {
          'convention': 'none'
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
