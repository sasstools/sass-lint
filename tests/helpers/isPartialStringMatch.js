'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

describe('helpers - isPartialStringMatch', function () {

  //////////////////////////////
  // isPartialStringMatch
  //////////////////////////////

  it('isPartialStringMatch - [needle: \'foo\', haystack: [\'foo\'] - true]', function () {
    var result = helpers.isPartialStringMatch('foo', ['foo']);

    assert.equal(true, result);
  });

  it('isPartialStringMatch - [needle: \'bar\', haystack: [\'foo\'] - false]', function () {
    var result = helpers.isPartialStringMatch('bar', ['foo']);

    assert.equal(false, result);
  });

  it('isPartialStringMatch - [needle: \'foo\', haystack: [\'foo-bar\'] - true]', function () {
    var result = helpers.isPartialStringMatch('foo', ['foo-bar']);

    assert.equal(true, result);
  });

  it('isPartialStringMatch - [needle: \'bar\', haystack: [\'foo-bar\'] - true]', function () {
    var result = helpers.isPartialStringMatch('bar', ['foo-bar']);

    assert.equal(true, result);
  });

  it('isPartialStringMatch - [needle: \'baz\', haystack: [\'foo\', \'bar\'] - false]', function () {
    var result = helpers.isPartialStringMatch('baz', ['foo', 'bar']);

    assert.equal(false, result);
  });

  it('isPartialStringMatch - [needle: \'baz\', haystack: [\'foo\', \'bar\', \'baz\'] - true]', function () {
    var result = helpers.isPartialStringMatch('baz', ['foo', 'bar', 'baz']);

    assert.equal(true, result);
  });

  it('isPartialStringMatch - [needle: \'foo-bar\', haystack: [\'foo\', \'bar\'] - false]', function () {
    var result = helpers.isPartialStringMatch('foo-bar', ['foo', 'bar']);

    assert.equal(false, result);
  });

  it('isPartialStringMatch - [needle: \'foo-bar\', haystack: [\'baz\', \'qux\', \'foo\', \'bar\'] - false]', function () {
    var result = helpers.isPartialStringMatch('foo-bar', ['baz', 'qux', 'foo', 'bar']);

    assert.equal(false, result);
  });
});
