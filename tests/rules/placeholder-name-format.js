'use strict';

var lint = require('./_lint');

// ==============================================================================
//  SCSS
// ==============================================================================

describe('placeholder name format - scss', function () {
  var file = lint.file('placeholder-name-format.scss');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'placeholder-name-format': 1
    }, function (data) {
      lint.assert.equal(14, data.warningCount);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });

  it('[convention: pascalcase]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'pascalcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[convention: strictbem]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'strictbem'
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });

  it('[convention: hyphenatedbem]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'hyphenatedbem'
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('[convention: allow-leading-underscore false]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'allow-leading-underscore': false
        }
      ]
    }, function (data) {
      lint.assert.equal(15, data.warningCount);
      done();
    });
  });
});

// ==============================================================================
//  Sass
// ==============================================================================

describe('placeholder name format - sass', function () {
  var file = lint.file('placeholder-name-format.sass');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'placeholder-name-format': 1
    }, function (data) {
      lint.assert.equal(14, data.warningCount);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[convention: pascalcase]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'pascalcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('[convention: strictbem]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'strictbem'
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });

  it('[convention: hyphenatedbem]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': 'hyphenatedbem'
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('[convention: allow-leading-underscore false]', function (done) {
    lint.test(file, {
      'placeholder-name-format': [
        1,
        {
          'allow-leading-underscore': false
        }
      ]
    }, function (data) {
      lint.assert.equal(15, data.warningCount);
      done();
    });
  });
});
