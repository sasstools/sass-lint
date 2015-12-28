'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('class name format - scss', function () {
  var file = lint.file('class-name-format.scss');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'class-name-format': 1
    }, function (data) {
      lint.assert.equal(24, data.warningCount);
      done();
    });
  });

  it('[convention: hyphenatedlowercase with ignore]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'ignore': ['block__element--modifier']
        }
      ]
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
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
      lint.assert.equal(34, data.warningCount);
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
      lint.assert.equal(29, data.warningCount);
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
      lint.assert.equal(19, data.warningCount);
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
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$'
        }
      ]
    }, function (data) {
      lint.assert.equal(35, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$], with convention-explanation', function (done) {
    var message = 'Its bad and you should feel bad.';
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': message
        }
      ]
    }, function (data) {
      lint.assert.equal(31, data.warningCount);
      lint.assert.equal(data.messages[0].message, message);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('class name format - sass', function () {
  var file = lint.file('class-name-format.sass');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'class-name-format': 1
    }, function (data) {
      lint.assert.equal(24, data.warningCount);
      done();
    });
  });

  it('[convention: hyphenatedlowercase with ignore]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'ignore': ['block__element--modifier']
        }
      ]
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
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
      lint.assert.equal(34, data.warningCount);
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
      lint.assert.equal(29, data.warningCount);
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
      lint.assert.equal(19, data.warningCount);
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
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$'
        }
      ]
    }, function (data) {
      lint.assert.equal(35, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$], with convention-explanation', function (done) {
    var message = 'Its bad and you should feel bad.';
    lint.test(file, {
      'class-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': message
        }
      ]
    }, function (data) {
      lint.assert.equal(31, data.warningCount);
      lint.assert.equal(data.messages[0].message, message);
      done();
    });
  });
});
