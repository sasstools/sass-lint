'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

var haystack = [
  {
    prop: 'a',
    propb: 'b'
  },
  {
    prop: 'c',
    propb: 'd'
  }
];

describe('helpers - propertySearch', function () {
  //////////////////////////////
  // propertySearch
  //////////////////////////////

  it('propertySearch should not find a property', function (done) {

    var needle = 'e',
        property = 'prop',
        result = helpers.propertySearch(haystack, needle, property);

    assert.equal(-1, result);
    done();
  });

  it('propertySearch should find a property', function (done) {

    var needle = 'a',
        property = 'prop',
        result = helpers.propertySearch(haystack, needle, property);

    assert.equal(0, result);
    done();
  });

  it('propertySearch should find a deeper property', function (done) {

    var needle = 'd',
        property = 'propb',
        result = helpers.propertySearch(haystack, needle, property);

    assert.equal(1, result);
    done();
  });
});
