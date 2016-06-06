'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers', function () {
  //////////////////////////////
  // Helpers is loaded
  //////////////////////////////

  it('helpers should not be undefined', function (done) {

    var loaded = typeof (helpers) === 'object' ? true : false;

    assert.equal(true, loaded);
    done();
  });
});
