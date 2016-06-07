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
    },

    otherClassBlock =
    {
      type: 'class',
      content:
      [
        {
          type: 'ident',
          content: 'test',
          syntax: 'scss',
          start: { line: 9, column: 2 },
          end: { line: 9, column: 5 },
          indexHasChanged: [ 0 ]
        }
      ],
      syntax: 'scss',
      start: { line: 9, column: 1 },
      end: { line: 9, column: 5 },
      indexHasChanged: [ 0 ]
    };

describe('helpers - isUnique', function () {
  //////////////////////////////
  // isUnique
  //////////////////////////////

  it('isUnique should return false - [objA === objB]', function (done) {


    var ledger = [];
    ledger.push(classBlock);

    var result = helpers.isUnique(ledger, classBlock);

    assert.equal(false, result);
    done();
  });

  it('isUnique should return true - [objA !== objB]', function (done) {


    var ledger = [];
    ledger.push(classBlock);

    var result = helpers.isUnique(ledger, otherClassBlock);

    assert.equal(false, result);
    done();
  });
});
