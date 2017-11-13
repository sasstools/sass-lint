'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no-media-feature-vendor-prefix - scss', function () {
  var file = lint.file('no-media-feature-vendor-prefix.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'no-media-feature-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-min-device-pixel-ratio]]', function (done) {
    lint.test(file, {
      'no-media-feature-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-min-device-pixel-ratio'],
        },
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });


  // Not realistic but checking the functionality anyway
  it('[additional-identifiers: [-non-standard-min-resolution]]', function (done) {
    lint.test(file, {
      'no-media-feature-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard-min-resolution'],
        },
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-min-device-pixel-ratio], additional-identifiers: [-non-standard-min-resolution]]', function (done) {
    lint.test(file, {
      'no-media-feature-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard-min-resolution'],
          'excluded-identifiers': ['-webkit-min-device-pixel-ratio'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
//
// //////////////////////////////
// // Sass syntax tests
// //////////////////////////////
describe('no-media-feature-vendor-prefix - sass', function () {
  var file = lint.file('no-media-feature-vendor-prefix.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'no-media-feature-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-min-device-pixel-ratio]]', function (done) {
    lint.test(file, {
      'no-media-feature-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-min-device-pixel-ratio'],
        },
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  // Not realistic but checking the functionality anyway
  it('[additional-identifiers: [-non-standard-min-resolution]]', function (done) {
    lint.test(file, {
      'no-media-feature-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard-min-resolution'],
        },
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-min-device-pixel-ratio], additional-identifiers: [-non-standard-min-resolution]]', function (done) {
    lint.test(file, {
      'no-media-feature-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard-min-resolution'],
          'excluded-identifiers': ['-webkit-min-device-pixel-ratio'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
