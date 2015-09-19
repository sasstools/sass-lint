'use strict';

var lint = require('./_lint');

describe('leading zero', function () {
  it('scss - [include: false]', function (done) {
    var file = lint.file('leading-zero.scss');

    lint.test(file, {
      'leading-zero': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('scss - [include: true]', function (done) {
    var file = lint.file('leading-zero.scss');

    lint.test(file, {
      'leading-zero': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('sass - [include: false]', function (done) {
    var file = lint.file('leading-zero.sass');

    lint.test(file, {
      'leading-zero': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('sass - [include: true]', function (done) {
    var file = lint.file('leading-zero.sass');

    lint.test(file, {
      'leading-zero': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
