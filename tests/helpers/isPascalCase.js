'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isPascalCase', function () {

  //////////////////////////////
  // isPascalCase
  //////////////////////////////

  it('isPascalCase - [\'TEST\' - true]', function (done) {

    var result = helpers.isPascalCase('TEST');

    assert.equal(true, result);
    done();
  });

  it('isPascalCase - [\'test\' - false]', function (done) {

    var result = helpers.isPascalCase('test');

    assert.equal(false, result);
    done();
  });

  it('isPascalCase - [AbcDEF - true]', function (done) {

    var result = helpers.isPascalCase('AbcDEF');

    assert.equal(true, result);
    done();
  });

  it('isPascalCase - [\'123\' - false]', function (done) {

    var result = helpers.isPascalCase('123');

    assert.equal(false, result);
    done();
  });

  it('isPascalCase - [\'ABcDeF\' - true]', function (done) {

    var result = helpers.isPascalCase('ABcDeF');

    assert.equal(true, result);
    done();
  });
});
