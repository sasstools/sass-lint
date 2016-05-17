'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isNestable', function () {

  //////////////////////////////
  // isNestable
  //////////////////////////////

  it('isNestable - nest attribute in selector', function (done) {
    var elements = ['selector', 'class', 'id', 'attribute'],
        nestable = ['class', 'selector', 'attribute'],
        previous = 'selector',
        current = 'attribute';

    var result = helpers.isNestable(current, previous, elements, nestable);

    assert.equal(true, result);
    done();
  });

  it('isNestable - nest id in class', function (done) {
    var elements = ['selector', 'class', 'id', 'attribute'],
        nestable = ['class', 'selector', 'attribute'],
        previous = 'class',
        current = 'id';

    var result = helpers.isNestable(current, previous, elements, nestable);

    assert.equal(false, result);
    done();
  });
});
