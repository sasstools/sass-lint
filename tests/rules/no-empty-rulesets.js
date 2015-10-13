'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no empty rulesets - scss', function () {
  var file = lint.file('no-empty-rulesets.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'empty-ruleset': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
