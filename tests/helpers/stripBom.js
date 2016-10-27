'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers'),
    fs = require('fs');

describe('helpers - stripBom', function () {

  //////////////////////////////
  // Strip BOM
  //////////////////////////////

  it('should remove the BOM marker', function (done) {
    var file = fs.readFileSync('tests/bom-utf8/starts-with-mixin-utf8-bom.scss').toString();
    assert.equal(file.charCodeAt(0), 0xFEFF);
    assert.notEqual(helpers.stripBom(file).charCodeAt(0), 0xFEFF);
    done();
  });

  it('should throw an error if not passed a string', function (done) {
    assert.throws(
      function () {
        helpers.stripBom(8);
      }, Error
    );
    done();
  });
});
