'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('no vendor prefix - scss', function () {
  var file = lint.file('no-vendor-prefixes.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': 1
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
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
      lint.assert.equal(5, data.warningCount);
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
      lint.assert.equal(11, data.warningCount);
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
      lint.assert.equal(11, data.warningCount);
      done();
    });
  });

  it('[ignore-non-standard: true]', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': [
        1,
        {
          'ignore-non-standard': true
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[ignore-non-standard: true][excluded-identifiers: webkit]', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': [
        1,
        {
          'excluded-identifiers': [
            'webkit'
          ],
          'ignore-non-standard': true
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
describe('no vendor prefix - sass', function () {
  var file = lint.file('no-vendor-prefixes.sass');

  it('enforce', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': 1
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
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
      lint.assert.equal(5, data.warningCount);
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
      lint.assert.equal(11, data.warningCount);
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
      lint.assert.equal(11, data.warningCount);
      done();
    });
  });

  it('[ignore-non-standard: true]', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': [
        1,
        {
          'ignore-non-standard': true
        }
      ]
    }, function (data) {
      lint.assert.equal(4, data.warningCount);
      done();
    });
  });

  it('[ignore-non-standard: true][excluded-identifiers: webkit]', function (done) {
    lint.test(file, {
      'no-vendor-prefixes': [
        1,
        {
          'excluded-identifiers': [
            'webkit'
          ],
          'ignore-non-standard': true
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
