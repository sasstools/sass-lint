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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "border, display, height, width", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "border, content, height, width", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "border, composes, display, height, width", found "composes, height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "border, composes, display, height, width", found "height, display, width, border, composes"', data.messages[3].message);

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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "border, display, height, width", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "border, content, height, width", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "border, display, height, width", found "height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "border, display, height, width", found "height, display, width, border"', data.messages[3].message);
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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "height, width, border, content", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "height, width, display, border, composes", found "composes, height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "height, width, display, border, composes", found "height, display, width, border, composes"', data.messages[3].message);

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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "height, width, border, content", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "height, composes, width, display, border", found "composes, height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "height, composes, width, display, border", found "height, display, width, border, composes"', data.messages[3].message);

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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "height, width, border, content", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[3].message);

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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "display, width, height, border", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "width, height, border, content", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "composes, display, width, height, border", found "composes, height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "composes, display, width, height, border", found "height, display, width, border, composes"', data.messages[3].message);

      done();
    });
  });

  it('[order: custom + group separator]', function (done) {
    file = lint.file('property-sort-order-group-separator.scss');

    lint.test(file, {
      'property-sort-order': [
        1,
        {
          'order': [
            'width',
            'height',
            '(group separator)',
            'display',
            '(group separator)',
            'border',
            'foo',
            '(group separator)',
            'bar'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      lint.assert.equal('Expected "width, height, (group separator), display, (group separator), border", found "width, height, (group separator), display, border"', data.messages[0].message);

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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "border, display, height, width", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "border, content, height, width", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "border, composes, display, height, width", found "composes, height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "border, composes, display, height, width", found "height, display, width, border, composes"', data.messages[3].message);

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
      // console.log(data.messages.map(function (m, i) { return 'lint.assert.equal(\'' + m.message + '\', data.messages[' + i + '].message);'; }).join('\n'));

      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "border, display, height, width", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "border, content, height, width", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "border, display, height, width", found "height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "border, display, height, width", found "height, display, width, border"', data.messages[3].message);

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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "height, width, border, content", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "height, width, display, border, composes", found "composes, height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "height, width, display, border, composes", found "height, display, width, border, composes"', data.messages[3].message);

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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "height, width, border, content", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "height, composes, width, display, border", found "composes, height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "height, composes, width, display, border", found "height, display, width, border, composes"', data.messages[3].message);

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
      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "height, width, border, content", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "height, width, display, border", found "height, display, width, border"', data.messages[3].message);

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
      // console.log(data.messages.map(function (m, i) { return 'lint.assert.equal(\'' + m.message + '\', data.messages[' + i + '].message);'; }).join('\n'));

      lint.assert.equal(4, data.warningCount);
      lint.assert.equal('Expected "display, width, height, border", found "height, display, width, border"', data.messages[0].message);
      lint.assert.equal('Expected "width, height, border, content", found "width, content, border, height"', data.messages[1].message);
      lint.assert.equal('Expected "composes, display, width, height, border", found "composes, height, display, width, border"', data.messages[2].message);
      lint.assert.equal('Expected "composes, display, width, height, border", found "height, display, width, border, composes"', data.messages[3].message);

      done();
    });
  });
});
