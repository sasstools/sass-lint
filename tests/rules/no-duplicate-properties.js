'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no duplicate properties - scss', function () {
  var file = lint.file('no-duplicate-properties.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-duplicate-properties': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
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
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('enforce - [exclude: background, display]', function (done) {
    lint.test(file, {
      'no-duplicate-properties': [
        1,
        {
          'exclude': [
            'background',
            'display'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no duplicate properties - sass', function () {
  var file = lint.file('no-duplicate-properties.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-duplicate-properties': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
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
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('enforce - [exclude: background, display]', function (done) {
    lint.test(file, {
      'no-duplicate-properties': [
        1,
        {
          'exclude': [
            'background',
            'display'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });
});
