'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('property-units - scss', function () {
  var file = lint.file('property-units.scss');

  it('globally-allowed-units: [], units-allowed-for-properties: {}', function (done) {
    lint.test(file, {
      'property-units': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('globally-allowed-units: [\'px\'], units-allowed-for-properties: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'globally-allowed-units': ['px']
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('globally-allowed-units: [\'em\'], units-allowed-for-properties: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'globally-allowed-units': ['em']
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('globally-allowed-units: [], units-allowed-for-properties: { height: [\'px\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'units-allowed-for-properties': { height: ['px'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('globally-allowed-units: [\'px\'], units-allowed-for-properties: { height: [\'em\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'globally-allowed-units': ['px'],
          'units-allowed-for-properties': { height: ['em'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe.only('property-units - sass', function () {
  var file = lint.file('property-units.sass');

  it('globally-allowed-units: [], units-allowed-for-properties: {}', function (done) {
    lint.test(file, {
      'property-units': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('globally-allowed-units: [\'px\'], units-allowed-for-properties: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'globally-allowed-units': ['px']
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('globally-allowed-units: [\'em\'], units-allowed-for-properties: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'globally-allowed-units': ['em']
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('globally-allowed-units: [], units-allowed-for-properties: { height: [\'px\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'units-allowed-for-properties': { height: ['px'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('globally-allowed-units: [\'px\'], units-allowed-for-properties: { height: [\'em\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'globally-allowed-units': ['px'],
          'units-allowed-for-properties': { height: ['em'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });
});
