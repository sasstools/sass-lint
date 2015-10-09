'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('final newline - scss', function () {

  // Final Newline w/Return
  it('with return', function (done) {
    var file = lint.file('final-newline--return.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  // Final Newline w/space
  it('with space', function (done) {
    var file = lint.file('final-newline--space.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  // Final Newline
  it('no space', function (done) {
    var file = lint.file('final-newline.scss');

    lint.test(file, {
      'final-newline': [
        1,
        {
          'include': false
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
describe('final newline - sass', function () {

  // Final Newline w/Return
  it('with return', function (done) {
    var file = lint.file('final-newline--return.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  // Final Newline w/space
  it('with space', function (done) {
    var file = lint.file('final-newline--space.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  // Final Newline
  it('no space', function (done) {
    var file = lint.file('final-newline.sass');

    lint.test(file, {
      'final-newline': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });
});
