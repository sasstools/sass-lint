'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isHyphenatedBEM', function () {

  //////////////////////////////
  // isHyphenatedBEM
  //////////////////////////////

  it('isHyphenatedBEM - [\'TEST\' - false]', function (done) {

    var result = helpers.isHyphenatedBEM('TEST');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'test\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('test');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedBEM - [abcDEF - false]', function (done) {

    var result = helpers.isHyphenatedBEM('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'abc---def\' - false]', function (done) {

    var result = helpers.isHyphenatedBEM('abc---def');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'abc___def\' - false]', function (done) {

    var result = helpers.isHyphenatedBEM('abc___def');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'ab__cd__ef\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('ab__cd__ef');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedBEM - [\'ab__cd--ef\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('ab__cd--ef');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedBEM - [\'abc_def\' - false]', function (done) {

    var result = helpers.isHyphenatedBEM('abc_def');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'abc-def\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('abc-def');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedBEM - [\'ab-cd__ef\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('ab-cd__ef');

    assert.equal(true, result);
    done();
  });
});
