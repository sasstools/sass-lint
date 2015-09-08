'use strict';

var lint = require('./_lint');

var file = lint.file('no-vendor-prefix.scss');

describe('no vendor prefix', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-vendor-prefix': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: webkit]', function (done) {
    lint.test(file, {
      'no-vendor-prefix': [
        1,
        {
          'excluded-identifiers':
          [
            'webkit'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(3, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: webkit, moz]', function (done) {
    lint.test(file, {
      'no-vendor-prefix': [
        1,
        {
          'excluded-identifiers':
          [
            'webkit',
            'moz'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });

  it('[included-identifiers: prefix]', function (done) {
    lint.test(file, {
      'no-vendor-prefix': [
        1,
        {
          'additional-identifiers':
          [
            'prefix'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[included-identifiers: prefix, webkit, moz]', function (done) {
    lint.test(file, {
      'no-vendor-prefix': [
        1,
        {
          'additional-identifiers':
          [
            'prefix',
            'webkit',
            'moz'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(6, data.warningCount);
      done();
    });
  });
});
