'use strict';

var lint = require('./_lint');

var file = lint.file('mixins-before-declarations.scss');

describe('mixins before declarations', function () {
  //////////////////////////////
  // Mixins Before Declarations
  //////////////////////////////
  it('enforce', function (done) {
    lint.test(file, {
      'mixins-before-declarations': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Mixins Before Declarations - overwrite
  //////////////////////////////
  it('[excludes: all]', function (done) {
    lint.test(file, {
      'mixins-before-declarations': [
        1,
        {
          'exclude': [
            'test-again',
            'waldo',
            'mq',
            'breakpoint'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Mixins Before Declarations - exclude certain
  // mixin test-again is not excluded
  //////////////////////////////
  it('[excludes: limited]', function (done) {
    lint.test(file, {
      'mixins-before-declarations': [
        1,
        {
          'exclude': [
            'waldo',
            'mq',
            'breakpoint'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});
