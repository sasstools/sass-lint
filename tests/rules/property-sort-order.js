'use strict';

var lint = require('./_lint');
//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('property sort order - scss', function () {
  var file = lint.file('property-sort-order.scss');
  describe('[order: alphabetical]', function () {
    var config = {
      'property-sort-order': 1
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(15, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: alphabetical, ignore-custom-properties: true]', function () {
    var config = {
      'property-sort-order': [
        1,
        {
          'ignore-custom-properties': true
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(12, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: custom]', function () {
    var config = {
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
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(8, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: custom + composes, ignore-custom-properties: false]', function () {
    var config = {
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
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(10, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: custom + composes, ignore-custom-properties: true]', function () {
    var config = {
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
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(8, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: recess]', function () {
    var config = {
      'property-sort-order': [
        1,
        {
          'order': 'recess'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(12, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: smacss]', function () {
    var config = {
      'property-sort-order': [
        1,
        {
          'order': 'smacss'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(12, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });

  });
  describe('[order: concentric]', function () {
    var config = {
      'property-sort-order': [
        1,
        {
          'order': 'concentric'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(14, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('property sort order - sass', function () {
  var file = lint.file('property-sort-order.sass');

  describe('[order: alphabetical]', function () {
    var config = {
      'property-sort-order': 1
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(15, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: alphabetical, ignore-custom-properties: true]', function () {
    var config = {
      'property-sort-order': [
        1,
        {
          'ignore-custom-properties': true
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(12, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: custom]', function () {
    var config = {
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
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(8, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: custom + composes, ignore-custom-properties: false]', function () {
    var config = {
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
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(10, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[order: custom + composes, ignore-custom-properties: true]', function () {
    var config = {
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
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(8, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });

  describe('[order: recess]', function () {
    var config = {
      'property-sort-order': [
        1,
        {
          'order': 'recess'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(12, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });

  describe('[order: smacss]', function () {
    var config = {
      'property-sort-order': [
        1,
        {
          'order': 'smacss'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(12, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });

  describe('[order: concentric]', function () {
    var config = {
      'property-sort-order': [
        1,
        {
          'order': 'concentric'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(14, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
});
