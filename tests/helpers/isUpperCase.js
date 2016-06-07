'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isUpperCase', function () {

  //////////////////////////////
  // isUpperCase
  //////////////////////////////

  it('isUpperCase - [\'TEST\' - true]', function (done) {

    var result = helpers.isUpperCase('TEST');

    assert.equal(true, result);
    done();
  });

  it('isUpperCase - [\'test\' - false]', function (done) {

    var result = helpers.isUpperCase('test');

    assert.equal(false, result);
    done();
  });

  it('isUpperCase - [abcDEF - false]', function (done) {

    var result = helpers.isUpperCase('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isUpperCase - [\'123\' - false]', function (done) {

    var result = helpers.isUpperCase('123');

    assert.equal(false, result);
    done();
  });

});
