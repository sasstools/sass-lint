'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('property-units - scss', function () {
  var file = lint.file('property-units.scss');

  it('global: [], per-property: {}', function (done) {
    lint.test(file, {
      'property-units': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('global: [\'px\'], per-property: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'global': ['px']
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('global: [\'em\'], per-property: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'global': ['em']
        }
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('global: [\'em\', \'px\'], per-property: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'global': ['em', 'px']
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('global: [], per-property: { height: [\'px\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'per-property': { height: ['px'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('global: [], per-property: { height: [\'px\', \'em\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'per-property': { height: ['px', 'em'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('global: [\'px\'], per-property: { height: [\'em\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'global': ['px'],
          'per-property': { height: ['em'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('property-units - sass', function () {
  var file = lint.file('property-units.sass');

  it('global: [], per-property: {}', function (done) {
    lint.test(file, {
      'property-units': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('global: [\'px\'], per-property: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'global': ['px']
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('global: [\'em\'], per-property: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'global': ['em']
        }
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('global: [\'em\', \'px\'], per-property: {}', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'global': ['em', 'px']
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('global: [], per-property: { height: [\'px\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'per-property': { height: ['px'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('global: [], per-property: { height: [\'px\', \'em\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'per-property': { height: ['px', 'em'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('global: [\'px\'], per-property: { height: [\'em\'] }', function (done) {
    lint.test(file, {
      'property-units': [
        1,
        {
          'global': ['px'],
          'per-property': { height: ['em'] }
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});
