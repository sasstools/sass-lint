'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('property sort order - scss', function () {
  var file = lint.file('property-sort-order.scss');

  it('[order: alphabetical]', function (done) {
    lint.test(file, {
      'property-sort-order': 1
    }, function (data) {
      lint.assert.equal(15, data.warningCount);
      done();
    });
  });

  it('[order: alphabetical, ignore-custom-properties: true]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'ignore-custom-properties': true
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[order: custom]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': [
            'height',
            'width',
            'display',
            'color'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[order: custom + composes, ignore-custom-properties: false]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': [
            'height',
            'composes',
            'width',
            'display',
            'color'
          ],
          'ignore-custom-properties': false
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[order: custom + composes, ignore-custom-properties: true]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': [
            'height',
            'width',
            'display',
            'color'
          ],
          'ignore-custom-properties': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[order: recess]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': 'recess'
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[order: smacss]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': 'smacss'
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[order: concentric]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': 'concentric'
        }
      ]
    }, function (data) {
      lint.assert.equal(14, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('property sort order - sass', function () {
  var file = lint.file('property-sort-order.sass');

  it('[order: alphabetical]', function (done) {
    lint.test(file, {
      'property-sort-order': 1
    }, function (data) {
      lint.assert.equal(15, data.warningCount);
      done();
    });
  });

  it('[order: alphabetical, ignore-custom-properties: true]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'ignore-custom-properties': true
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[order: custom]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': [
            'height',
            'width',
            'display',
            'color'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[order: custom + composes, ignore-custom-properties: false]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': [
            'height',
            'composes',
            'width',
            'display',
            'color'
          ],
          'ignore-custom-properties': false
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[order: custom + composes, ignore-custom-properties: true]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': [
            'height',
            'width',
            'display',
            'color'
          ],
          'ignore-custom-properties': true
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  it('[order: recess]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': 'recess'
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[order: smacss]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': 'smacss'
        }
      ]
    }, function (data) {
      lint.assert.equal(12, data.warningCount);
      done();
    });
  });

  it('[order: concentric]', function (done) {
    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': 'concentric'
        }
      ]
    }, function (data) {
      lint.assert.equal(14, data.warningCount);
      done();
    });
  });
});
