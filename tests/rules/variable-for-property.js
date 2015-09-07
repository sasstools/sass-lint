'use strict';

var lint = require('./_lint');

var file = lint.file('variable-for-property.scss');

describe('variable for property', function () {
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
            'content'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
