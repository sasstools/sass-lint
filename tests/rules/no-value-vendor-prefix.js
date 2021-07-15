'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no-value-vendor-prefix - scss', function () {
  var file = lint.file('no-value-vendor-prefix.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'no-value-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-flex]]', function (done) {
    lint.test(file, {
      'no-value-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-flex'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  // Not realistic but checking the functionality anyway
  it('[additional-identifiers: [-webkit-non-standard]]', function (done) {
    lint.test(file, {
      'no-value-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-non-standard'],
        },
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-flex], additional-identifiers: [-webkit-non-standard]]', function (done) {
    lint.test(file, {
      'no-value-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-non-standard'],
          'excluded-identifiers': ['-webkit-flex'],
        },
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});

// //////////////////////////////
// // Sass syntax tests
// //////////////////////////////
describe('no-value-vendor-prefix - sass', function () {
  var file = lint.file('no-value-vendor-prefix.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'no-value-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-flex]]', function (done) {
    lint.test(file, {
      'no-value-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-flex'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  // Not realistic but checking the functionality anyway
  it('[additional-identifiers: [-webkit-non-standard]]', function (done) {
    lint.test(file, {
      'no-value-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-non-standard'],
        },
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-flex], additional-identifiers: [-webkit-non-standard]]', function (done) {
    lint.test(file, {
      'no-value-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-non-standard'],
          'excluded-identifiers': ['-webkit-flex'],
        },
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });
});
