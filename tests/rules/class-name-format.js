'use strict';

var lint = require('./_lint');

describe('class name format - scss', function () {
  var file = lint.file('class-name-format.scss');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'class-name-format': 1
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[convention: strictbem]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': 'strictbem'
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[convention: hyphenatedbem]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': 'hyphenatedbem'
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });
});

describe('class name format - sass', function () {
  var file = lint.file('class-name-format.sass');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'class-name-format': 1
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[convention: strictbem]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': 'strictbem'
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[convention: hyphenatedbem]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': 'hyphenatedbem'
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });
});
