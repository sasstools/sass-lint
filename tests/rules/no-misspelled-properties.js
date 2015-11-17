'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no misspelled properties - scss', function () {
  var file = lint.file('no-misspelled-properties.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'no-misspelled-properties': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[extra-properties: transit1on]', function (done) {
    lint.test(file, {
      'no-misspelled-properties': [
        1,
        {
          'extra-properties': [
            'transit1on'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[extra-properties: transit1on, colors]', function (done) {
    lint.test(file, {
      'no-misspelled-properties': [
        1,
        {
          'extra-properties': [
            'transit1on',
            'colors'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no misspelled properties - sass', function () {
  var file = lint.file('no-misspelled-properties.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'no-misspelled-properties': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[extra-properties: transit1on]', function (done) {
    lint.test(file, {
      'no-misspelled-properties': [
        1,
        {
          'extra-properties': [
            'transit1on'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[extra-properties: transit1on, colors]', function (done) {
    lint.test(file, {
      'no-misspelled-properties': [
        1,
        {
          'extra-properties': [
            'transit1on',
            'colors'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
