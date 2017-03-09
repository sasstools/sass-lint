'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('quotes - scss', function () {
  var file = lint.file('quotes.scss');

  it('[style: single, attribute: single]', function (done) {
    lint.test(file, {
      'quotes': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('[style: double, attribute: double]', function (done) {
    lint.test(file, {
      'quotes': [
        1,
        {
          'style': 'double'
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('[style: single, attribute: double]', function (done) {
    lint.test(file, {
      'quotes': [
        1,
        {
          'attribute': 'double'
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('[style: double, attribute: single]', function (done) {
    lint.test(file, {
      'quotes': [
        1,
        {
          'style': 'double',
          'attribute': 'single'
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
describe('quotes - sass', function () {
  var file = lint.file('quotes.sass');

  it('[style: single, attribute: single]', function (done) {
    lint.test(file, {
      'quotes': 1
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('[style: double, attribute: double]', function (done) {
    lint.test(file, {
      'quotes': [
        1,
        {
          'style': 'double'
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('[style: single, attribute: double]', function (done) {
    lint.test(file, {
      'quotes': [
        1,
        {
          'attribute': 'double'
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });

  it('[style: double, attribute: single]', function (done) {
    lint.test(file, {
      'quotes': [
        1,
        {
          'style': 'double',
          'attribute': 'single'
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});
