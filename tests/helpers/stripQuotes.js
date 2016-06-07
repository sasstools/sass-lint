'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - stripQuotes', function () {

  //////////////////////////////
  // Strip quotes
  //////////////////////////////

  it('stripQuotes - [double quotes]', function (done) {
    var result = helpers.stripQuotes('"This is a string"'),
        expect = 'This is a string';

    assert.equal(expect, result);
    done();
  });

  it('stripQuotes - [single quotes]', function (done) {
    var result = helpers.stripQuotes('\'This is a string\''),
        expect = 'This is a string';

    assert.equal(expect, result);
    done();
  });
});
