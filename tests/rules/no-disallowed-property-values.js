'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no disallowed property values - scss', function () {
  var file = lint.file('no-disallowed-property-values.scss');

  it('properties: { display: [block, inline] }', function (done) {
    lint.test(file, {
      'no-disallowed-property-values': [
        1,
        {
          properties: {
            'display': ['block', 'inline']
          }
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('properties: { display: [inline] }', function (done) {
    lint.test(file, {
      'no-disallowed-property-values': [
        1,
        {
          properties: {
            'display': ['inline']
          }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('properties: { display: inline }', function (done) {
    lint.test(file, {
      'no-disallowed-property-values': [
        1,
        {
          properties: {
            'display': 'inline'
          }
        }
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
describe('no disallowed property values - sass', function () {
  var file = lint.file('no-disallowed-property-values.sass');

  it('properties: { display: [block, inline] }', function (done) {
    lint.test(file, {
      'no-disallowed-property-values': [
        1,
        {
          properties: {
            'display': ['block', 'inline']
          }
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('properties: { display: [inline] }', function (done) {
    lint.test(file, {
      'no-disallowed-property-values': [
        1,
        {
          properties: {
            'display': ['inline']
          }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('properties: { display: inline }', function (done) {
    lint.test(file, {
      'no-disallowed-property-values': [
        1,
        {
          properties: {
            'display': 'inline'
          }
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
