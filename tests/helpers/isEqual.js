'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers');

var classBlock =
    {
      type: 'class',
      content:
      [
        {
          type: 'ident',
          content: 'foo',
          syntax: 'scss',
          start: { line: 5, column: 2 },
          end: { line: 5, column: 4 },
          indexHasChanged: [ 0 ]
        }
      ],
      syntax: 'scss',
      start: { line: 5, column: 1 },
      end: { line: 5, column: 4 },
      indexHasChanged: [ 0 ]
    };

describe('helpers - isEqual', function () {
  //////////////////////////////
  // isEqual
  //////////////////////////////

  it('isEqual should return true', function (done) {

    var testBlock =
        {
          type: 'class',
          content:
          [
            {
              type: 'ident',
              content: 'foo',
              syntax: 'scss',
              start: { line: 5, column: 2 },
              end: { line: 5, column: 4 },
              indexHasChanged: [ 0 ]
            }
          ],
          syntax: 'scss',
          start: { line: 5, column: 1 },
          end: { line: 5, column: 4 },
          indexHasChanged: [ 0 ]
        },
        result = helpers.isEqual(classBlock, testBlock);

    assert.equal(true, result);
    done();
  });

  it('isEqual should return false - [objA.type !== objB.type]', function (done) {

    var testBlock = {
          type: 'block',
          start: {line: 5},
          end: {line: 5},
          content: [1]
        },
        result = helpers.isEqual(classBlock, testBlock);

    assert.equal(false, result);
    done();
  });

  it('isEqual should return false - [objA.start.line !== objB.start.line]', function (done) {

    var testBlock = {
          type: 'class',
          start: {line: 7},
          end: {line: 5},
          content: [1]
        },
        result = helpers.isEqual(classBlock, testBlock);

    assert.equal(false, result);
    done();
  });

  it('isEqual should return false - [objA.end.line !== objB.end.line]', function (done) {

    var testBlock = {
          type: 'class',
          start: {line: 5},
          end: {line: 7},
          content: [1]
        },
        result = helpers.isEqual(classBlock, testBlock);

    assert.equal(false, result);
    done();
  });

  it('isEqual should return false - [objA.content.length !== objB.content.length]', function (done) {

    var testBlock = {
          type: 'class',
          start: {line: 5},
          end: {line: 5},
          content: [1, 2, 3, 4]
        },
        result = helpers.isEqual(classBlock, testBlock);

    assert.equal(false, result);
    done();
  });
});
