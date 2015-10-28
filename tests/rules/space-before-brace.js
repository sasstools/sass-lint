'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('space before brace - scss', function () {
  var file = lint.file('space-before-brace.scss');

  it('[include: true]', function (done) {
    lint.test(file, {
      'space-before-brace': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('[include: false]', function (done) {
    lint.test(file, {
      'space-before-brace': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(11, data.warningCount);
      done();
    });
  });
});
