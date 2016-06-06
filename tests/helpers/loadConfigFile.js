'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - loadConfigFile', function () {

  //////////////////////////////
  // loadConfigFile
  //////////////////////////////

  it('loadConfigFile', function (done) {

    var result = helpers.loadConfigFile('../../tests/testFile.txt'),
        expect = 'This is a test file that test\'s the loadConfigFile helper function.';

    assert.equal(expect, result);
    done();
  });
});
