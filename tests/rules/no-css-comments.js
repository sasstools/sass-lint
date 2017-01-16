'use strict';

var lint = require('./_lint');

describe('no css comments', function () {
  var config = {
    'no-css-comments': 1
  };
  //////////////////////////////
  // SCSS syntax tests
  //////////////////////////////
  describe('scss', function () {
    var file = lint.file('no-css-comments.scss');
    it('enforce', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(4, data.warningCount);
        done();
      });
    });
    it('corrects', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  //////////////////////////////
  // Sass syntax tests
  //////////////////////////////
  describe('sass', function () {
    var file = lint.file('no-css-comments.sass');
    it('enforce', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(4, data.warningCount);
        done();
      });
    });
    it('corrects', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
});
