'use strict';

var lint = require('./_lint');

var file = lint.file('no-duplicate-properties.scss');

describe('no duplicate properties', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-duplicate-properties': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('enforce - [exclude: background]', function (done) {
    lint.test(file, {
      'no-duplicate-properties': [
        1,
        {
          'exclude': [
            'background'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
