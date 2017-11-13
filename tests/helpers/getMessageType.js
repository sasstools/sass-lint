'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - getMessageType', function () {

  //////////////////////////////
  // Get Message Type
  //////////////////////////////

  it('getMessageType - [severity: 1]', function (done) {
    var result = helpers.getMessageType({severity: 1}),
        expect = 'warning';

    assert.equal(expect, result);
    done();
  });

  it('getMessageType - [severity: 2]', function (done) {
    var result = helpers.getMessageType({severity: 2}),
        expect = 'error';

    assert.equal(expect, result);
    done();
  });
  it('getMessageType - []', function (done) {
    var result = helpers.getMessageType({}),
        expect = 'warning';

    assert.equal(expect, result);
    done();
  });
});
