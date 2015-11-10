'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('property-units - scss', function () {
  var file = lint.file('property-units.scss');

  it('globallyAllowedUnits: [], unitsAllowedForProperties: {}', function (done) {
    lint.test(file, {
      'property-units': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('globallyAllowedUnits: [\'px\'], unitsAllowedForProperties: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          globallyAllowedUnits: ['px']
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('globallyAllowedUnits: [\'em\'], unitsAllowedForProperties: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          globallyAllowedUnits: ['em']
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('globallyAllowedUnits: [], unitsAllowedForProperties: { height: [\'px\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          unitsAllowedForProperties: { height: ['px'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('globallyAllowedUnits: [\'px\'], unitsAllowedForProperties: { height: [\'em\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          globallyAllowedUnits: ['px'],
          unitsAllowedForProperties: { height: ['em'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('border zero - sass', function () {
  var file = lint.file('property-units.sass');

  it('globallyAllowedUnits: [], unitsAllowedForProperties: {}', function (done) {
    lint.test(file, {
      'property-units': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('globallyAllowedUnits: [\'px\'], unitsAllowedForProperties: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          globallyAllowedUnits: ['px']
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('globallyAllowedUnits: [\'em\'], unitsAllowedForProperties: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          globallyAllowedUnits: ['em']
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('globallyAllowedUnits: [], unitsAllowedForProperties: { height: [\'px\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          unitsAllowedForProperties: { height: ['px'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('globallyAllowedUnits: [\'px\'], unitsAllowedForProperties: { height: [\'em\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          globallyAllowedUnits: ['px'],
          unitsAllowedForProperties: { height: ['em'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });
});
