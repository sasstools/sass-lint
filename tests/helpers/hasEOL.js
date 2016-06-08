'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - hasEOL', function () {

  //////////////////////////////
  // hasEOL
  //////////////////////////////

  it('hasEOL - [\'\\n\' - true]', function (done) {

    var result = helpers.hasEOL('\n');

    assert.equal(true, result);
    done();
  });

  it('hasEOL - [\'\\r\\n\' - true]', function (done) {

    var result = helpers.hasEOL('\r\n');

    assert.equal(true, result);
    done();
  });
});
