'use strict';

var lint = require('./_lint');

describe('no mergeable selectors - scss', function () {
  var file = lint.file('no-mergeable-selectors.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': 1
    }, function (data) {
      lint.assert.equal(24, data.warningCount);
      done();
    });
  });

  it('[whitelist: div p]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'whitelist': [
            'div p'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
      done();
    });
  });

});

describe('no mergeable selectors - sass', function () {
  var file = lint.file('no-mergeable-selectors.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': 1
    }, function (data) {
      lint.assert.equal(22, data.warningCount);
      done();
    });
  });

  it('[whitelist: div p]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'whitelist': [
            'div p'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(21, data.warningCount);
      done();
    });
  });
});
