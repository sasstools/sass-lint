'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isValidHex', function () {

  //////////////////////////////
  // isValidHex
  //////////////////////////////

  it('isValidHex - [\'abcdef\' - true]', function (done) {

    var result = helpers.isValidHex('abcdef');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'ABCDEF\' - true]', function (done) {

    var result = helpers.isValidHex('ABCDEF');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'123456\' - true]', function (done) {

    var result = helpers.isValidHex('123456');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'ABC123\' - true]', function (done) {

    var result = helpers.isValidHex('ABC123');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'abc123\' - true]', function (done) {

    var result = helpers.isValidHex('abc123');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'fff\' - true]', function (done) {

    var result = helpers.isValidHex('fff');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'123\' - true]', function (done) {

    var result = helpers.isValidHex('123');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'efghij\' - false]', function (done) {

    var result = helpers.isValidHex('efghij');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'thj\' - false]', function (done) {

    var result = helpers.isValidHex('thj');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'ab\' - false]', function (done) {

    var result = helpers.isValidHex('ab');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'12\' - false]', function (done) {

    var result = helpers.isValidHex('12');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'1234567\' - false]', function (done) {

    var result = helpers.isValidHex('1234567');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'abc1234\' - false]', function (done) {

    var result = helpers.isValidHex('abc1234');

    assert.equal(false, result);
    done();
  });
});
