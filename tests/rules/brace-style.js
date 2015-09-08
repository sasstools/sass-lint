'use strict';

var lint = require('./_lint');

var file = lint.file('brace-style.scss');

describe('brace style', function () {
  it('[style: 1tbs]', function (done) {
    lint.test(file, {
      'brace-style': 1
    }, function (data) {
      lint.assert.equal(14, data.warningCount);
      done();
    });
  });

  it('[style: stroustrup]', function (done) {
    lint.test(file, {
      'brace-style': [
        1,
        {
          'style': 'stroustrup'
        }
      ]
    }, function (data) {
      lint.assert.equal(13, data.warningCount);
      done();
    });
  });

  it('[style: allman]', function (done) {
    lint.test(file, {
      'brace-style': [
        1,
        {
          'style': 'allman'
        }
      ]
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });
});
