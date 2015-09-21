'use strict';

var lint = require('./_lint');

describe('empty args', function () {
  it('scss - [include: false]', function (done) {
    var file = lint.file('empty-args.scss');

    lint.test(file, {
      'empty-args': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('scss - [include: true]', function (done) {
    var file = lint.file('empty-args.scss');

    lint.test(file, {
      'empty-args': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('sass - [include: false]', function (done) {
    var file = lint.file('empty-args.sass');

    lint.test(file, {
      'empty-args': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('sass - [include: true]', function (done) {
    var file = lint.file('empty-args.sass');

    lint.test(file, {
      'empty-args': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
