'use strict';

var lint = require('./_lint');

describe('no mergeable selectors - scss', function () {
  var file = lint.file('no-mergeable-selectors.scss');

  it('[force-nesting: true]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[force-nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

describe('no mergeable selectors', function () {
  var file = lint.file('no-mergeable-selectors.sass');

  it('[force-nesting: true]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[force-nesting: true]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
