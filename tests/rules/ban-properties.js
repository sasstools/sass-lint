'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('ban properties - scss', function () {
  var file = lint.file('ban-properties.scss');

  it('properties: [z-index]', function (done) {
    lint.test(file, {
      'ban-properties': [1, { properties: ['z-index'] }]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('ban properties - sass', function () {
  var file = lint.file('ban-properties.sass');

  it('properties: [z-index]', function (done) {
    lint.test(file, {
      'ban-properties': [1, { properties: ['z-index'] }]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
