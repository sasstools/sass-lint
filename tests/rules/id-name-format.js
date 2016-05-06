'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('id name format - scss', function () {
  var file = lint.file('id-name-format.scss');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'id-name-format': 1
    }, function (data) {
      lint.assert.equal(14, data.warningCount);
      done();
    });
  });

  it('[convention: hyphenatedlowercase with ignore]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'ignore': ['one_parent_valid_child']
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });

  it('[convention: pascalcase]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': 'pascalcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$'
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$], with convention-explanation', function (done) {
    var message = 'Its bad and you should feel bad.';
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': message
        }
      ]
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      lint.assert.equal(data.messages[0].message, message);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('id name format - sass', function () {
  var file = lint.file('id-name-format.sass');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'id-name-format': 1
    }, function (data) {
      lint.assert.equal(14, data.warningCount);
      done();
    });
  });

  it('[convention: hyphenatedlowercase with ignore]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'ignore': ['one_parent_valid_child']
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[convention: pascalcase]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': 'pascalcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$'
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$], with convention-explanation', function (done) {
    var message = 'Its bad and you should feel bad.';
    lint.test(file, {
      'id-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': message
        }
      ]
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      lint.assert.equal(data.messages[0].message, message);
      done();
    });
  });
});
