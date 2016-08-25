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

// 1 less warning than scss syntax as we dont attempt to merge media queries
describe('no mergeable selectors - sass', function () {
  var file = lint.file('no-mergeable-selectors.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': 1
    }, function (data) {
      lint.assert.equal(21, data.warningCount);
      done();
    });
  });

  // 1 less warning than scss syntax as we dont attempt to merge media queries
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
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });
});
