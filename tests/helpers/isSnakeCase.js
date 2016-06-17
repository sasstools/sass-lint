'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isSnakeCase', function () {

  //////////////////////////////
  // isSnakeCase
  //////////////////////////////

  it('isSnakeCase - [\'TEST\' - false]', function (done) {

    var result = helpers.isSnakeCase('TEST');

    assert.equal(false, result);
    done();
  });

  it('isSnakeCase - [\'test\' - true]', function (done) {

    var result = helpers.isSnakeCase('test');

    assert.equal(true, result);
    done();
  });

  it('isSnakeCase - [abcDEF - false]', function (done) {

    var result = helpers.isSnakeCase('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isSnakeCase - [\'123\' - true]', function (done) {

    var result = helpers.isSnakeCase('123');

    assert.equal(true, result);
    done();
  });

  it('isSnakeCase - [\'ab_cd_ef\' - true]', function (done) {

    var result = helpers.isSnakeCase('ab_cd_ef');

    assert.equal(true, result);
    done();
  });

  it('isSnakeCase - [\'ab_cd-ef\' - false]', function (done) {

    var result = helpers.isSnakeCase('ab_cd-ef');

    assert.equal(false, result);
    done();
  });
});
