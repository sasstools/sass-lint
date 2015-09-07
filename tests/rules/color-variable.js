'use strict';

var lint = require('./_lint');

var file = lint.file('color-variable.scss');

describe('color variable', function () {
  //////////////////////////////
  // Color Variable
  //////////////////////////////
  it('[allow-rgba: false]', function (done) {
    lint.test(file, {
      'color-variable': 1
    }, function (data) {
      lint.assert.equal(19, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Color Variable - allow rgba
  //////////////////////////////
  it('[allow-rgba: true]', function (done) {
    lint.test(file, {
      'color-variable': [
        1,
        {
          'allow-rgba': true
        }
      ]
    }, function (data) {
      lint.assert.equal(18, data.warningCount);
      done();
    });
  });
});
