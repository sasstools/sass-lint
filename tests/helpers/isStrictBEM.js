'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isStrictBEM', function () {

  //////////////////////////////
  // isStrictBEM
  //////////////////////////////

  it('isStrictBEM - [\'TEST\' - false]', function (done) {

    var result = helpers.isStrictBEM('TEST');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'test\' - true]', function (done) {

    var result = helpers.isStrictBEM('test');

    assert.equal(true, result);
    done();
  });

  it('isStrictBEM - [abcDEF - false]', function (done) {

    var result = helpers.isStrictBEM('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'abc---def\' - false]', function (done) {

    var result = helpers.isStrictBEM('abc---def');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'abc___def\' - false]', function (done) {

    var result = helpers.isStrictBEM('abc___def');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'ab__cd__ef\' - false]', function (done) {

    var result = helpers.isStrictBEM('ab__cd__ef');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'ab__cd--ef\' - false]', function (done) {

    var result = helpers.isStrictBEM('ab__cd--ef');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'ab__cd_ef_gh\' - true]', function (done) {

    var result = helpers.isStrictBEM('ab__cd_ef_gh');

    assert.equal(true, result);
    done();
  });

  it('isStrictBEM - [\'ab-cd-ef__gh-ij-kl_mn-op-qr_st-uv-wx\' - true]', function (done) {

    var result = helpers.isStrictBEM('ab-cd-ef__gh-ij-kl_mn-op-qr_st-uv-wx');

    assert.equal(true, result);
    done();
  });

  it('isStrictBEM - [\'ab__cd_ef_gh_ij\' - false]', function (done) {

    var result = helpers.isStrictBEM('ab__cd_ef_gh_ij');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'abc_def\' - false]', function (done) {

    var result = helpers.isStrictBEM('abc_def');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'abc-def\' - true]', function (done) {

    var result = helpers.isStrictBEM('abc-def');

    assert.equal(true, result);
    done();
  });

  it('isStrictBEM - [\'ab-cd__ef\' - true]', function (done) {

    var result = helpers.isStrictBEM('ab-cd__ef');

    assert.equal(true, result);
    done();
  });
});
