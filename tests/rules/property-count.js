'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('property count - scss', function () {
  var file = lint.file('property-count.scss');

  it('[default]', function (done) {
    lint.test(file, {
      'property-count': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[max-properties: 2]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 2
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[max-properties: 2, include-nested: true]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 2,
          'include-nested': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[max-properties: 0, include-nested: true]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 0,
          'include-nested': true
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[max-properties: 4]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 4
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[max-properties: 4, include-nested: true]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 4,
          'include-nested': true
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
describe('property count - sass', function () {
  var file = lint.file('property-count.sass');

  it('[default]', function (done) {
    lint.test(file, {
      'property-count': 1
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[max-properties: 2]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 2
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[max-properties: 2, include-nested: true]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 2,
          'include-nested': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[max-properties: 0, include-nested: true]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 0,
          'include-nested': true
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  it('[max-properties: 4]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 4
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[max-properties: 4, include-nested: true]', function (done) {
    lint.test(file, {
      'property-count': [
        1,
        {
          'max-properties': 4,
          'include-nested': true
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});
