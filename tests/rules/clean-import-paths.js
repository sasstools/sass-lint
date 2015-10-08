'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('clean import paths - scss', function () {
  var file = lint.file('clean-import-paths.scss');

  it('[leading-underscore: false, filename-extension: false]', function (done) {
    lint.test(file, {
      'clean-import-paths': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[leading-underscore: true, filename-extension: false]', function (done) {
    lint.test(file, {
      'clean-import-paths': [
        1,
        {
          'leading-underscore': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[leading-underscore: false, filename-extension: true]', function (done) {
    lint.test(file, {
      'clean-import-paths': [
        1,
        {
          'filename-extension': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[leading-underscore: true, filename-extension: true]', function (done) {
    lint.test(file, {
      'clean-import-paths': [
        1,
        {
          'leading-underscore': true,
          'filename-extension': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('clean import paths - sass', function () {
  var file = lint.file('clean-import-paths.sass');

  it('[leading-underscore: false, filename-extension: false]', function (done) {
    lint.test(file, {
      'clean-import-paths': 1
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[leading-underscore: true, filename-extension: false]', function (done) {
    lint.test(file, {
      'clean-import-paths': [
        1,
        {
          'leading-underscore': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[leading-underscore: false, filename-extension: true]', function (done) {
    lint.test(file, {
      'clean-import-paths': [
        1,
        {
          'filename-extension': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[leading-underscore: true, filename-extension: true]', function (done) {
    lint.test(file, {
      'clean-import-paths': [
        1,
        {
          'leading-underscore': true,
          'filename-extension': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});
