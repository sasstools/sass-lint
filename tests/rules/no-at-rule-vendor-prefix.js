'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no-at-rule-vendor-prefix - scss', function () {
  var file = lint.file('no-at-rule-vendor-prefix.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-keyframes]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-keyframes'],
        },
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-keyframes, -ms-viewport]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-keyframes', '-ms-viewport'],
        },
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  // Not realistic but checking the functionality anyway
  it('[additional-identifiers: [-non-standard]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard'],
        },
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[additional-identifiers: [-non-standard, -non-standard-2]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard', '-non-standard-2'],
        },
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-keyframes], additional-identifiers: [-non-standard]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard'],
          'excluded-identifiers': ['-webkit-keyframes'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no-at-rule-vendor-prefix - sass', function () {
  var file = lint.file('no-at-rule-vendor-prefix.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': 1,
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-keyframes]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-keyframes'],
        },
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-keyframes, -ms-viewport]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'excluded-identifiers': ['-webkit-keyframes', '-ms-viewport'],
        },
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  // Not realistic but checking the functionality anyway
  it('[additional-identifiers: [-non-standard]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard'],
        },
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[additional-identifiers: [-non-standard, -non-standard-2]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard', '-non-standard-2'],
        },
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: [-webkit-keyframes], additional-identifiers: [-non-standard]]', function (done) {
    lint.test(file, {
      'no-at-rule-vendor-prefix': [
        1,
        {
          'additional-identifiers': ['-non-standard'],
          'excluded-identifiers': ['-webkit-keyframes'],
        },
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });
});
