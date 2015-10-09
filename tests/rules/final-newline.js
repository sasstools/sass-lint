'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('final newline - scss', function () {

  // With newline (testing file without)
  it('with newline [include: true]', function (done) {
    var file = lint.file('final-newline--none.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('with newline [include: false]', function (done) {
    var file = lint.file('final-newline--none.scss');

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

  // Final Newline w/space
  it('with space [include: true]', function (done) {
    var file = lint.file('final-newline--space.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('with space [include: false]', function (done) {
    var file = lint.file('final-newline--space.scss');

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

  // No newline (testing file with)
  it('no newline [include: true]', function (done) {
    var file = lint.file('final-newline--return.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('no newline [include: false]', function (done) {
    var file = lint.file('final-newline--return.scss');

    lint.test(file, {
      'final-newline': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('final newline - sass', function () {

  // With newline (testing file without)
  it('with newline [include: true]', function (done) {
    var file = lint.file('final-newline--none.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('with newline [include: false]', function (done) {
    var file = lint.file('final-newline--none.sass');

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

  // Final Newline w/space
  it('with space [include: true]', function (done) {
    var file = lint.file('final-newline--space.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('with space [include: false]', function (done) {
    var file = lint.file('final-newline--space.sass');

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

  // No newline (testing file with)
  it('no newline [include: true]', function (done) {
    var file = lint.file('final-newline--return.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('no newline [include: false]', function (done) {
    var file = lint.file('final-newline--return.sass');

    lint.test(file, {
      'final-newline': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
