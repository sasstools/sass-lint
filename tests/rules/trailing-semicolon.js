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
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
