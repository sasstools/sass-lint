'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isEmptyLine', function () {

  //////////////////////////////
  // isEmptyLine
  //////////////////////////////

  it('isEmptyLine - [\'\\n\\n\' - true]', function (done) {

    var result = helpers.isEmptyLine('\n\n');

    assert.equal(true, result);
    done();
  });

  it('isEmptyLine - [\'\\r\\n\\r\\n\' - true]', function (done) {

    var result = helpers.isEmptyLine('\r\n\r\n');

    assert.equal(true, result);
    done();
  });

  it('isEmptyLine - [\'\\n \\n\' - false]', function (done) {

    var result = helpers.isEmptyLine('\n \n');

    assert.equal(false, result);
    done();
  });

  it('isEmptyLine - [\'\\r\\nabc\\r\\n\' - false]', function (done) {

    var result = helpers.isEmptyLine('\r\nabc\r\n');

    assert.equal(false, result);
    done();
  });
});
