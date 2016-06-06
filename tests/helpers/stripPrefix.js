'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - stripPrefix', function () {

  //////////////////////////////
  // stripPrefix
  //////////////////////////////

  it('stripPrefix - [-webkit-transition - transition]', function (done) {

    var result = helpers.stripPrefix('-webkit-transition');

    assert.equal('transition', result);
    done();
  });

  it('stripPrefix - [-moz-transition - transition]', function (done) {

    var result = helpers.stripPrefix('-moz-transition');

    assert.equal('transition', result);
    done();
  });

  it('stripPrefix - [-webkit-border-color - border-color]', function (done) {

    var result = helpers.stripPrefix('-webkit-border-color');

    assert.equal('border-color', result);
    done();
  });

  it('stripPrefix - [-moz-osx-font-smoothing - font-smoothing]', function (done) {

    var result = helpers.stripPrefix('-moz-osx-font-smoothing');

    assert.equal('font-smoothing', result);
    done();
  });

  it('stripPrefix - [@-webkit-keyframes - @keyframes]', function (done) {

    var result = helpers.stripPrefix('@-webkit-keyframes');

    assert.equal('@keyframes', result);
    done();
  });
});
