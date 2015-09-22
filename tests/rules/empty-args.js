'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('empty args - scss', function () {
  var file = lint.file('empty-args.scss');

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

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('empty args - sass', function () {
  var file = lint.file('empty-args.sass');

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
