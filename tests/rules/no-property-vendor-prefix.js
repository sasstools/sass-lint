'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no-property-vendor-prefix - scss', function () {
  var file = lint.file('no-property-vendor-prefix.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'no-property-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-transform]]', function (done) {
    lint.test(file, {
      'no-property-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-transform'],
        },
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[additional-identifiers: [-webkit-touch-callout]]', function (done) {
    lint.test(file, {
      'no-property-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-touch-callout'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-transform], additional-identifiers: [-webkit-touch-callout]]', function (done) {
    lint.test(file, {
      'no-property-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-touch-callout'],
          'excluded-identifiers': ['-webkit-transform'],
        },
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
describe('no-property-vendor-prefix - sass', function () {
  var file = lint.file('no-property-vendor-prefix.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'no-property-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-transform]]', function (done) {
    lint.test(file, {
      'no-property-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-transform'],
        },
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[additional-identifiers: [-webkit-touch-callout]]', function (done) {
    lint.test(file, {
      'no-property-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-touch-callout'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-transform], additional-identifiers: [-webkit-touch-callout]]', function (done) {
    lint.test(file, {
      'no-property-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-webkit-touch-callout'],
          'excluded-identifiers': ['-webkit-transform'],
        },
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
