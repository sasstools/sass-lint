'use strict';

var assert = require('assert'),
    selectorHelpers = require('../../lib/selector-helpers'),
    groot = require('../../lib/groot'),
    path = require('path'),
    fs = require('fs'),
    equal = require('deep-equal');

describe('selectorHelpers - constructSelector', function () {

  var expectedSelectors = [
        '.test',
        '#test',
        '%test',
        '.#{test}',
        '.test',
        '#test',
        'input[type="text"]',
        '.test > li',
        'span[lang~=en-us]',
        '.block__element-one',
        '##{$id}',
        '.right-element::-ms-backdrop',
        '.wrong-element:selection',
        'p:nth-of-type(2)',
        '.test',
        '&__test'
      ],
      selectorList = [];

  before(function () {
    var file = '../sass/selector-helpers/selector-helpers.scss',
        ast = groot(fs.readFileSync(path.join(__dirname, file)), path.extname(file).replace('.', ''), file);

    ast.traverseByType('selector', function (value) {
      var ruleSet = '';
      value.forEach(function (selectorContent) {
        ruleSet += selectorHelpers.constructSelector(selectorContent);
      });
      selectorList.push(ruleSet);
    });
  });

  //////////////////////////////
  // contructSelector
  //////////////////////////////

  it('should return the correct class name', function (done) {
    assert(equal(selectorList[0], expectedSelectors[0]));
    done();
  });

  it('should return the correct ID name', function (done) {
    assert(equal(selectorList[1], expectedSelectors[1]));
    done();
  });

  it('should return the correct placeholder name', function (done) {
    assert(equal(selectorList[2], expectedSelectors[2]));
    done();
  });

  it('should return the correct interpolated selector name', function (done) {
    assert(equal(selectorList[3], expectedSelectors[3]));
    done();
  });

  it('should return the correct type selector name', function (done) {
    assert(equal(selectorList[6], expectedSelectors[6]));
    done();
  });

  it('should return the correct combinator selector name', function (done) {
    assert(equal(selectorList[7], expectedSelectors[7]));
    done();
  });

  it('should return the correct attribute selector name', function (done) {
    assert(equal(selectorList[8], expectedSelectors[8]));
    done();
  });

  it('should return the correct BEM selector name', function (done) {
    assert(equal(selectorList[9], expectedSelectors[9]));
    done();
  });

  it('should return the correct interpolated ID selector name', function (done) {
    assert(equal(selectorList[10], expectedSelectors[10]));
    done();
  });

  it('should return the correct pseudo element selector name', function (done) {
    assert(equal(selectorList[11], expectedSelectors[11]));
    done();
  });

  it('should return the correct pseudo selector name', function (done) {
    assert(equal(selectorList[12], expectedSelectors[12]));
    done();
  });

  it('should return the correct nth selector name', function (done) {
    assert(equal(selectorList[13], expectedSelectors[13]));
    done();
  });

  it('should return the correct parent selector name', function (done) {
    assert(equal(selectorList[16], expectedSelectors[16]));
    done();
  });

});
