'use strict';

var lint = require('./_lint');

var file = lint.file('shorthand-values.scss');

describe('shorthand values - scss', function () {
  it('[default]', function (done) {
    lint.test(file, {
      'shorthand-values': 1
    }, function (data) {
      lint.assert.equal(44, data.warningCount);
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
      lint.assert.equal(19, data.warningCount);
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
      lint.assert.equal(20, data.warningCount);
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
      lint.assert.equal(26, data.warningCount);
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
      lint.assert.equal(32, data.warningCount);
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
      lint.assert.equal(38, data.warningCount);
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
      lint.assert.equal(32, data.warningCount);
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
      lint.assert.equal(44, data.warningCount);
      done();
    });
  });
});

// Sass

describe('shorthand values - sass', function () {
  it('[default]', function (done) {
    lint.test(lint.file('shorthand-values.sass'), {
      'shorthand-values': 1
    }, function (data) {
      lint.assert.equal(44, data.warningCount);
      done();
    });
  });

  it('[allowed: 1]', function (done) {
    lint.test(lint.file('shorthand-values.sass'), {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            1
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(19, data.warningCount);
      done();
    });
  });

  it('[allowed: 2]', function (done) {
    lint.test(lint.file('shorthand-values.sass'), {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            2
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[allowed: 3]', function (done) {
    lint.test(lint.file('shorthand-values.sass'), {
      'shorthand-values': [
        1,
        {
          'allowed-shorthands': [
            3
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(26, data.warningCount);
      done();
    });
  });

  it('[allowed: none]', function (done) {
    lint.test(lint.file('shorthand-values.sass'), {
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
    lint.test(lint.file('shorthand-values.sass'), {
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
      lint.assert.equal(32, data.warningCount);
      done();
    });
  });

  it('[allowed: 1, 3]', function (done) {
    lint.test(lint.file('shorthand-values.sass'), {
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
      lint.assert.equal(38, data.warningCount);
      done();
    });
  });

  it('[allowed: 2, 3]', function (done) {
    lint.test(lint.file('shorthand-values.sass'), {
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
      lint.assert.equal(32, data.warningCount);
      done();
    });
  });

  it('[allowed: 1, 2, 3] - as default', function (done) {
    lint.test(lint.file('shorthand-values.sass'), {
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
      lint.assert.equal(44, data.warningCount);
      done();
    });
  });
});
