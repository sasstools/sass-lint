'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('max-file-line-count - scss', function () {
  var file = lint.file('max-file-line-count.scss');

  it('enforce [default]', function (done) {
    lint.test(file, {
      'max-file-line-count': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('enforce [length: 3000]', function (done) {
    lint.test(file, {
      'max-file-line-count': [
        1,
        {
          length: 3000
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('max-file-line-count - sass', function () {
  var file = lint.file('max-file-line-count.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'max-file-line-count': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('enforce [length: 3000]', function (done) {
    lint.test(file, {
      'max-file-line-count': [
        1,
        {
          length: 3000
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });
});
