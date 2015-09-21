'use strict';

var lint = require('./_lint');

describe('border zero', function () {
  it('scss - [convention: 0]', function (done) {
    var file = lint.file('border-zero.scss');

    lint.test(file, {
      'border-zero': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('scss - [convention: \'none\']', function (done) {
    var file = lint.file('border-zero.scss');

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

  it('sass - [convention: 0]', function (done) {
    var file = lint.file('border-zero.sass');

    lint.test(file, {
      'border-zero': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('sass - [convention: \'none\']', function (done) {
    var file = lint.file('border-zero.sass');

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
