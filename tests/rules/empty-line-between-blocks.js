'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('empty line between blocks - scss', function () {
  it('without comments - [include: true, allow-single-line-rulesets: true]', function (done) {
    var file = lint.file('empty-line-between-blocks.scss');

    lint.test(file, {
      'empty-line-between-blocks': 1
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('without comments - [include: true, allow-single-line-rulesets: false]', function (done) {
    var file = lint.file('empty-line-between-blocks.scss');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': true,
          'allow-single-line-rulesets': false
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('without comments - [include: false, allow-single-line-rulesets: true]', function (done) {
    var file = lint.file('empty-line-between-blocks.scss');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': false,
          'allow-single-line-rulesets': true
        }
      ]
    }, function (data) {
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('without comments - [include: false, allow-single-line-rulesets: false]', function (done) {
    var file = lint.file('empty-line-between-blocks.scss');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': false,
          'allow-single-line-rulesets': false
        }
      ]
    }, function (data) {
      lint.assert.equal(22, data.warningCount);
      done();
    });
  });

  it('with comments - [include: true, allow-single-line-rulesets: true]', function (done) {
    var file = lint.file('empty-line-with-comments.scss');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': true,
          'allow-single-line-rulesets': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('with comments - [include: true, allow-single-line-rulesets: false]', function (done) {
    var file = lint.file('empty-line-with-comments.scss');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': true,
          'allow-single-line-rulesets': false
        }
      ]
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('with comments - [include: false, allow-single-line-rulesets: true]', function (done) {
    var file = lint.file('empty-line-with-comments.scss');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': false,
          'allow-single-line-rulesets': true
        }
      ]
    }, function (data) {
      lint.assert.equal(25, data.warningCount);
      done();
    });
  });

  it('with comments - [include: false, allow-single-line-rulesets: false]', function (done) {
    var file = lint.file('empty-line-with-comments.scss');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': false,
          'allow-single-line-rulesets': false
        }
      ]
    }, function (data) {
      lint.assert.equal(26, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('empty line between blocks - sass', function () {
  it('without comments - [include: true, allow-single-line-rulesets: true]', function (done) {
    var file = lint.file('empty-line-between-blocks.sass');

    lint.test(file, {
      'empty-line-between-blocks': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('without comments - [include: true, allow-single-line-rulesets: false]', function (done) {
    var file = lint.file('empty-line-between-blocks.sass');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': true,
          'allow-single-line-rulesets': false
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('without comments - [include: false, allow-single-line-rulesets: true]', function (done) {
    var file = lint.file('empty-line-between-blocks.sass');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': false
        }
      ]
    }, function (data) {
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('without comments - [include: false, allow-single-line-rulesets: false]', function (done) {
    var file = lint.file('empty-line-between-blocks.sass');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': false,
          'allow-single-line-rulesets': false
        }
      ]
    }, function (data) {
      lint.assert.equal(17, data.warningCount);
      done();
    });
  });

  it('with comments - [include: true, allow-single-line-rulesets: true]', function (done) {
    var file = lint.file('empty-line-with-comments.sass');

    lint.test(file, {
      'empty-line-between-blocks': 1
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('with comments - [include: true, allow-single-line-rulesets: false]', function (done) {
    var file = lint.file('empty-line-with-comments.sass');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': true,
          'allow-single-line-rulesets': false
        }
      ]
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });

  it('with comments - [include: false, allow-single-line-rulesets: true]', function (done) {
    var file = lint.file('empty-line-with-comments.sass');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': false,
          'allow-single-line-rulesets': true
        }
      ]
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
      done();
    });
  });

  it('with comments - [include: false, allow-single-line-rulesets: false]', function (done) {
    var file = lint.file('empty-line-with-comments.sass');

    lint.test(file, {
      'empty-line-between-blocks': [
        1,
        {
          'include': false,
          'allow-single-line-rulesets': false
        }
      ]
    }, function (data) {
      lint.assert.equal(23, data.warningCount);
      done();
    });
  });
});
