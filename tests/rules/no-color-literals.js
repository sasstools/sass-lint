'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no color literals - scss', function () {
  var file = lint.file('no-color-literals.scss');

  it('[allow-rgba: false]', function (done) {
    lint.test(file, {
      'no-color-literals': 1
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });

  it('[allow-rgba: true]', function (done) {
    lint.test(file, {
      'no-color-literals': [
        1,
        {
          'allow-rgba': true
        }
      ]
    }, function (data) {
      lint.assert.equal(15, data.warningCount);
      done();
    });
  });

  it('[allow-variable-identifiers: false]', function (done) {
    lint.test(file, {
      'no-color-literals': [
        1,
        {
          'allow-variable-identifiers': false
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[allow-map-identifiers: false]', function (done) {
    lint.test(file, {
      'no-color-literals': [
        1,
        {
          'allow-map-identifiers': false
        }
      ]
    }, function (data) {
      lint.assert.equal(19, data.warningCount);
      done();
    });
  });

  it('[allow-rgba: true, allow-variable-identifiers: false, allow-map-identifiers: false ]', function (done) {
    lint.test(file, {
      'no-color-literals': [
        1,
        {
          'allow-rgba': true,
          'allow-variable-identifiers': false,
          'allow-map-identifiers': false
        }
      ]
    }, function (data) {
      lint.assert.equal(22, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('no color literals - sass', function () {
  var file = lint.file('no-color-literals.sass');

  it('[allow-rgba: false]', function (done) {
    lint.test(file, {
      'no-color-literals': 1
    }, function (data) {
      lint.assert.equal(16, data.warningCount);
      done();
    });
  });

  it('[allow-rgba: true]', function (done) {
    lint.test(file, {
      'no-color-literals': [
        1,
        {
          'allow-rgba': true
        }
      ]
    }, function (data) {
      lint.assert.equal(15, data.warningCount);
      done();
    });
  });

  it('[allow-variable-identifiers: false]', function (done) {
    lint.test(file, {
      'no-color-literals': [
        1,
        {
          'allow-variable-identifiers': false
        }
      ]
    }, function (data) {
      lint.assert.equal(20, data.warningCount);
      done();
    });
  });

  it('[allow-map-identifiers: false]', function (done) {
    lint.test(file, {
      'no-color-literals': [
        1,
        {
          'allow-map-identifiers': false
        }
      ]
    }, function (data) {
      lint.assert.equal(19, data.warningCount);
      done();
    });
  });

  it('[allow-rgba: true, allow-variable-identifiers: false, allow-map-identifiers: false ]', function (done) {
    lint.test(file, {
      'no-color-literals': [
        1,
        {
          'allow-rgba': true,
          'allow-variable-identifiers': false,
          'allow-map-identifiers': false
        }
      ]
    }, function (data) {
      lint.assert.equal(22, data.warningCount);
      done();
    });
  });
});
