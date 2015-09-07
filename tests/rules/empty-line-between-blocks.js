'use strict';

var lint = require('./_lint');


describe('empty line between blocks', function () {
  //////////////////////////////
  // Empty Line Between Blocks
  //////////////////////////////
  it('without comments', function (done) {
    var file = lint.file('empty-line-between-blocks.scss');

    lint.test(file, {
      'empty-line-between-blocks': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Empty Line With Comment
  //////////////////////////////
  it('with comments', function (done) {
    var file = lint.file('empty-line-with-comments.scss');

    lint.test(file, {
      'empty-line-between-blocks': 1
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
