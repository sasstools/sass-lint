'use strict';

var lint = require('./_lint');

describe('no mergeable selectors - scss', function () {
  var file = lint.file('no-mergeable-selectors.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': 1
    }, function (data) {
      lint.assert.equal(19, data.warningCount);
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
      lint.assert.equal(18, data.warningCount);
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
      lint.assert.equal(19, data.warningCount);
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
      lint.assert.equal(18, data.warningCount);
      done();
    });
  });

});
