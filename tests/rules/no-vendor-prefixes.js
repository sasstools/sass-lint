'use strict';

var lint = require('./_lint');

var file = lint.file('no-vendor-prefixes.scss');

describe('no vendor prefix', function () {
  it('enforce', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('[excluded-identifiers: webkit]', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': [
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
      'no-vendor-prefixes': [
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

  it('[included-identifiers: khtml]', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': [
        1,
        {
          'additional-identifiers':
          [
            'khtml'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(2, data.warningCount);
      done();
    });
  });

  it('[included-identifiers: khtml, webkit, moz]', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': [
        1,
        {
          'excluded-identifiers': [],
          'additional-identifiers':
          [
            'khtml',
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
