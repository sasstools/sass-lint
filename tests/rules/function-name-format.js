'use strict';

var lint = require('./_lint');

describe('function name format - scss', function () {
  var file = lint.file('function-name-format.scss');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'function-name-format': 1
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'function-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'function-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'function-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('[convention: allow-leading-underscore false]', function (done) {
    lint.test(file, {
      'function-name-format': [
        1,
        {
          'allow-leading-underscore': false
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });
});

describe('function name format - sass', function () {
  var file = lint.file('function-name-format.sass');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'function-name-format': 1
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'function-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'function-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'function-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('[convention: allow-leading-underscore false]', function (done) {
    lint.test(file, {
      'function-name-format': [
        1,
        {
          'allow-leading-underscore': false
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });
});
