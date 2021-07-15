'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no-selector-vendor-prefix - scss', function () {
  var file = lint.file('no-selector-vendor-prefix.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'no-selector-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-moz-placeholder]]', function (done) {
    lint.test(file, {
      'no-selector-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-moz-placeholder'],
        },
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[additional-identifiers: [-webkit-non-standard]]', function (done) {
    lint.test(file, {
      'no-selector-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-non-standard'],
        },
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-moz-placeholder], additional-identifiers: [-webkit-non-standard]]', function (done) {
    lint.test(file, {
      'no-selector-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-non-standard'],
          'excluded-identifiers': ['-moz-placeholder'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

// //////////////////////////////
// // Sass syntax tests
// //////////////////////////////
describe('no-selector-vendor-prefix - sass', function () {
  var file = lint.file('no-selector-vendor-prefix.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'no-selector-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-moz-placeholder]]', function (done) {
    lint.test(file, {
      'no-selector-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-moz-placeholder'],
        },
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[additional-identifiers: [-webkit-non-standard]]', function (done) {
    lint.test(file, {
      'no-selector-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-non-standard'],
        },
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-moz-placeholder], additional-identifiers: [-webkit-non-standard]]', function (done) {
    lint.test(file, {
      'no-selector-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-non-standard'],
          'excluded-identifiers': ['-moz-placeholder'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
