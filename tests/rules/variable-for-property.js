'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('variable for property - scss', function () {
  var file = lint.file('variable-for-property.scss');

  it('[]', function (done) {
    lint.test(file, {
      'variable-for-property': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[properties]', function (done) {
    lint.test(file, {
      'variable-for-property': [
        1,
        {
          'properties': [
            'margin',
            'content',
            'background'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('variable for property - sass', function () {
  var file = lint.file('variable-for-property.sass');

  it('[]', function (done) {
    lint.test(file, {
      'variable-for-property': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[properties]', function (done) {
    lint.test(file, {
      'variable-for-property': [
        1,
        {
          'properties': [
            'margin',
            'content',
            'background'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
