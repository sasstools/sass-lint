'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no ids - scss', function () {
  var file = lint.file('no-ids.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-ids': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no ids - sass', function () {
  var file = lint.file('no-ids.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-ids': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
