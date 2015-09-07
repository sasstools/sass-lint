'use strict';

var lint = require('./_lint');

var file = lint.file('no-empty-rulesets.scss');

describe('no empty rulesets', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'empty-ruleset': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
