'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isHyphenatedLowerCase', function () {

  //////////////////////////////
  // isHyphenatedLowercase
  //////////////////////////////

  it('isHyphenatedLowercase - [\'abc-def\' - true]', function (done) {

    var result = helpers.isHyphenatedLowercase('abc-def');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedLowercase - [\'TEST\' - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('TEST');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedLowercase - [\'test\' - true]', function (done) {

    var result = helpers.isHyphenatedLowercase('test');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedLowercase - [abcDEF - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedLowercase - [\'123\' - true]', function (done) {

    var result = helpers.isHyphenatedLowercase('123');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedLowercase - [\'aBcDeF\' - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('aBcDeF');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedLowercase - [\'abc-\\31\\32\\33\' - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('abc-\\31\\32\\33');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedLowercase - [\'abc-\\+\\*\' - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('abc-\\+\\*');

    assert.equal(false, result);
    done();
  });
});
