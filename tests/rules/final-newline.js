'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('final newline - scss', function () {

  it('none [include: true]', function (done) {
    var file = lint.file('final-newline--none.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('none [include: false]', function (done) {
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

  it('with return [include: true]', function (done) {
    var file = lint.file('final-newline--return.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('with return [include: false]', function (done) {
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

  it('with import [include: true]', function (done) {
    var file = lint.file('final-newline--import.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('with import [include: false]', function (done) {
    var file = lint.file('final-newline--import.scss');

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

  it('with nested [include: true]', function (done) {
    var file = lint.file('final-newline--nested.scss');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('with nested [include: false]', function (done) {
    var file = lint.file('final-newline--nested.scss');

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

  it('none [include: true]', function (done) {
    var file = lint.file('final-newline--none.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('none [include: false]', function (done) {
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

  it('with return [include: true]', function (done) {
    var file = lint.file('final-newline--return.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('with return [include: false]', function (done) {
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

  it('with import [include: true]', function (done) {
    var file = lint.file('final-newline--import.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('with import [include: false]', function (done) {
    var file = lint.file('final-newline--import.sass');

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

  it('with nested [include: true]', function (done) {
    var file = lint.file('final-newline--nested.sass');

    lint.test(file, {
      'final-newline': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('with nested [include: false]', function (done) {
    var file = lint.file('final-newline--nested.sass');

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
