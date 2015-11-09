'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('shorthand values - scss', function () {
  var file = lint.file('shorthand-values.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'shorthand-values': 1
    }, function (data) {
      lint.assert.equal(49, data.warningCount);
      done();
    });
  });

  it('[allowed: 1]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(21, data.warningCount);
      done();
    });
  });

  it('[allowed: 2]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            2
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
      done();
    });
  });

  it('[allowed: 3]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(29, data.warningCount);
      done();
    });
  });

  it('[allowed: none]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[allowed: 1, 2]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1,
            2
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(36, data.warningCount);
      done();
    });
  });

  it('[allowed: 1, 3]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1,
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(42, data.warningCount);
      done();
    });
  });

  it('[allowed: 2, 3]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            2,
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(36, data.warningCount);
      done();
    });
  });

  it('[allowed: 1, 2, 3] - as default', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1,
            2,
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(49, data.warningCount);
      done();
    });
  });
});


//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('shorthand values - sass', function () {
  var file = lint.file('shorthand-values.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'shorthand-values': 1
    }, function (data) {
      lint.assert.equal(49, data.warningCount);
      done();
    });
  });

  it('[allowed: 1]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(21, data.warningCount);
      done();
    });
  });

  it('[allowed: 2]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            2
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
      done();
    });
  });

  it('[allowed: 3]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(29, data.warningCount);
      done();
    });
  });

  it('[allowed: none]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[allowed: 1, 2]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1,
            2
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(36, data.warningCount);
      done();
    });
  });

  it('[allowed: 1, 3]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1,
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(42, data.warningCount);
      done();
    });
  });

  it('[allowed: 2, 3]', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            2,
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(36, data.warningCount);
      done();
    });
  });

  it('[allowed: 1, 2, 3] - as default', function (done) {
    lint.test(file, {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1,
            2,
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(49, data.warningCount);
      done();
    });
  });
});
