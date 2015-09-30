'use strict';

var lint = require('./_lint');

describe('no mergeable selectors - scss', function () {
  var file = lint.file('no-mergeable-selectors.scss');

  it('[force-nesting: true]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': 1
    }, function (data) {
      lint.assert.equal(36, data.warningCount);
      done();
    });
  });

  it('[force-element-nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-element-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(30, data.warningCount);
      done();
    });
  });

  it('[force-attribute-nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-attribute-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(33, data.warningCount);
      done();
    });
  });

  it('[force-pseudo-nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-pseudo-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(28, data.warningCount);
      done();
    });
  });

  it('[disable all nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-element-nesting': false,
          'force-attribute-nesting': false,
          'force-pseudo-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(19, data.warningCount);
      done();
    });
  });

  it('[whitelist: div p]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'whitelist': [
            'div p'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(35, data.warningCount);
      done();
    });
  });
});

describe('no mergeable selectors - sass', function () {
  var file = lint.file('no-mergeable-selectors.sass');

  it('[force-nesting: true]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': 1
    }, function (data) {
      lint.assert.equal(36, data.warningCount);
      done();
    });
  });

  it('[force-element-nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-element-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(30, data.warningCount);
      done();
    });
  });

  it('[force-attribute-nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-attribute-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(33, data.warningCount);
      done();
    });
  });

  it('[force-pseudo-nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-pseudo-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(28, data.warningCount);
      done();
    });
  });

  it('[disable all nesting: false]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'force-element-nesting': false,
          'force-attribute-nesting': false,
          'force-pseudo-nesting': false
        }
      ]
    }, function (data) {
      lint.assert.equal(19, data.warningCount);
      done();
    });
  });

  it('[whitelist: div p]', function (done) {
    lint.test(file, {
      'no-mergeable-selectors': [
        1,
        {
          'whitelist': [
            'div p'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(35, data.warningCount);
      done();
    });
  });
});
