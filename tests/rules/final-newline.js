'use strict';

var lint = require('./_lint');

describe('final newline', function () {
  //////////////////////////////
  // Final Newline w/Return
  //////////////////////////////
  it('with return', function (done) {
    var file = lint.file('final-newline--return.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Final Newline w/space
  //////////////////////////////
  it('with space', function (done) {
    var file = lint.file('final-newline--space.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Final Newline
  //////////////////////////////
  it('no space', function (done) {
    var file = lint.file('final-newline.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
