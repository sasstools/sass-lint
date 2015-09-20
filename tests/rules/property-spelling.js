'use strict';

var lint = require('./_lint');

describe('property spelling - scss', function () {
  var file = lint.file('property-spelling.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'property-spelling': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[extra-properties: transit1on]', function (done) {
    lint.test(file, {
      'property-spelling': [
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
      'property-spelling': [
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

describe('property spelling - sass', function () {
  var file = lint.file('property-spelling.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'property-spelling': 1
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[extra-properties: transit1on]', function (done) {
    lint.test(file, {
      'property-spelling': [
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
      'property-spelling': [
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
