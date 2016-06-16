'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isCamelCase', function () {

  //////////////////////////////
  // isCamelCase
  //////////////////////////////

  it('isCamelCase - [\'TEST\' - false]', function (done) {

    var result = helpers.isCamelCase('TEST');

    assert.equal(false, result);
    done();
  });

  it('isCamelCase - [\'test\' - true]', function (done) {

    var result = helpers.isCamelCase('test');

    assert.equal(true, result);
    done();
  });

  it('isCamelCase - [abcDEF - true]', function (done) {

    var result = helpers.isCamelCase('abcDEF');

    assert.equal(true, result);
    done();
  });

  it('isCamelCase - [\'123\' - false]', function (done) {

    var result = helpers.isCamelCase('123');

    assert.equal(false, result);
    done();
  });

  it('isCamelCase - [\'aBcDeF\' - true]', function (done) {

    var result = helpers.isCamelCase('aBcDeF');

    assert.equal(true, result);
    done();
  });
});
