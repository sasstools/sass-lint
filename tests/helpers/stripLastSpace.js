'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - stripLastSpace', function () {

  //////////////////////////////
  // stripLastSpace
  //////////////////////////////

  it('stripLastSpace - [\'selector \']', function (done) {

    var result = helpers.stripLastSpace('selector ');

    assert.equal('selector', result);
    done();
  });

  it('stripLastSpace - [\'selector test \']', function (done) {

    var result = helpers.stripLastSpace('selector test');

    assert.equal('selector test', result);
    done();
  });

  it('stripLastSpace - [\'selector\']', function (done) {

    var result = helpers.stripLastSpace('selector');

    assert.equal('selector', result);
    done();
  });

  it('stripLastSpace - [\'selector test\']', function (done) {

    var result = helpers.stripLastSpace('selector test');

    assert.equal('selector test', result);
    done();
  });
});
