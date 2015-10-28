'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('trailing semicolon - scss', function () {
  var file = lint.file('trailing-semicolon.scss');

  it('[include: true]', function (done) {
    lint.test(file, {
      'trailing-semicolon': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'trailing-semicolon': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
