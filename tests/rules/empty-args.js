'use strict';

var lint = require('./_lint');

var file = lint.file('empty-args.scss');

describe('empty args', function () {
  it('[include: false]', function (done) {
    lint.test(file, {
      'empty-args': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
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
