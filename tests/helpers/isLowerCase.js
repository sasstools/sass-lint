'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isLowerCase', function () {

  //////////////////////////////
  // isLowerCase
  //////////////////////////////

  it('isLowerCase - [\'TEST\' - false]', function (done) {

    var result = helpers.isLowerCase('TEST');

    assert.equal(false, result);
    done();
  });

  it('isLowerCase - [\'test\' - true]', function (done) {

    var result = helpers.isLowerCase('test');

    assert.equal(true, result);
    done();
  });

  it('isLowerCase - [abcDEF - false]', function (done) {

    var result = helpers.isLowerCase('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isLowerCase - [\'123\' - false]', function (done) {

    var result = helpers.isLowerCase('123');

    assert.equal(false, result);
    done();
  });
});
