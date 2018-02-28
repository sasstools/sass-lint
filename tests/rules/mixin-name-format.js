'use strict';

var lint = require('./_lint');

var SCSS_MIXIN_LINES = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65];
var SASS_MIXIN_LINES = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49];

var remove = function (arr, what) {
  var index = arr.indexOf(what);

  if (index > -1) {
    arr.splice(index, 1);
  }
};

var expectWarningOnlyOnLines = function (lines, data) {
  var actualLines;

  lint.assert(data.warningCount <= lines.length, 'There are more warnings (' + data.warningCount + ') than expected (' + lines.length + ')');

  actualLines = data.messages.map(function (message) {
    return message.line;
  });

  actualLines.forEach(function (line) {
    remove(lines, line);
  });

  lint.assert(lines.length === 0, 'Expected warnings on lines ' + lines.join(', ') + '. Warnings were on lines ' + actualLines.join(', '));
};

var mixinLinesExcept = function (TYPE, exceptions) {
  var lines = TYPE.slice(0);

  exceptions.forEach(function (exception) {
    remove(lines, exception);
  });

  return lines;
};

var scssMixinLinesExcept = function (exceptions) {
  return mixinLinesExcept(SCSS_MIXIN_LINES, exceptions);
};

var sassMixinLinesExcept = function (exceptions) {
  return mixinLinesExcept(SASS_MIXIN_LINES, exceptions);
};

describe('mixin name format - scss', function () {
  var file = lint.file('mixin-name-format.scss');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'mixin-name-format': 1
    }, function (data) {
      expectWarningOnlyOnLines(scssMixinLinesExcept([1, 25, 29, 49]), data);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(scssMixinLinesExcept([9, 29]), data);
      done();
    });
  });

  it('[convention: pascalcase]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'pascalcase'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(scssMixinLinesExcept([13]), data);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(scssMixinLinesExcept([5, 29, 33, 37, 41, 45, 53]), data);
      done();
    });
  });

  it('[convention: strictbem]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'strictbem'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(scssMixinLinesExcept([1, 5, 25, 29, 33, 37, 41, 53]), data);
      done();
    });
  });

  it('[convention: hyphenatedbem]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'hyphenatedbem'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(scssMixinLinesExcept([1, 25, 29, 37, 49, 53, 57, 61]), data);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(scssMixinLinesExcept([21]), data);
      done();
    });
  });

  it('[convention: allow-leading-underscore false]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'allow-leading-underscore': false
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(scssMixinLinesExcept([1, 29, 49]), data);
      done();
    });
  });
});

describe('mixin name format - sass', function () {
  var file = lint.file('mixin-name-format.sass');

  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'mixin-name-format': 1
    }, function (data) {
      expectWarningOnlyOnLines(sassMixinLinesExcept([1, 19, 22, 37]), data);
      done();
    });
  });

  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(sassMixinLinesExcept([7, 22]), data);
      done();
    });
  });

  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(sassMixinLinesExcept([4, 22, 25, 28, 31, 34, 40]), data);
      done();
    });
  });

  it('[convention: pascalcase]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'pascalcase'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(sassMixinLinesExcept([10]), data);
      done();
    });
  });

  it('[convention: strictbem]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'strictbem'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(sassMixinLinesExcept([1, 4, 19, 22, 25, 28, 31, 40]), data);
      done();
    });
  });

  it('[convention: hyphenatedbem]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': 'hyphenatedbem'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(sassMixinLinesExcept([1, 19, 22, 28, 37, 40, 43, 46]), data);
      done();
    });
  });

  it('[convention: RegExp ^[_A-Z]+$]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'convention': '^[_A-Z]+$',
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(sassMixinLinesExcept([16]), data);
      done();
    });
  });

  it('[convention: allow-leading-underscore false]', function (done) {
    lint.test(file, {
      'mixin-name-format': [
        1,
        {
          'allow-leading-underscore': false
        }
      ]
    }, function (data) {
      expectWarningOnlyOnLines(sassMixinLinesExcept([1, 22, 37]), data);
      done();
    });
  });
});
