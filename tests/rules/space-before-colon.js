'use strict';

var lint = require('./_lint');

var file = lint.file('space-before-colon.scss');

describe('space before colon', function () {
  it('[include: false]', function (done) {
    lint.test(file, {
      'space-before-colon': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-before-colon': [
        1,
        {
          'include': true
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
