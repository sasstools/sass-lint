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

describe('helpers - addUnique', function () {

  //////////////////////////////
  // addUnique
  //////////////////////////////

  it('addUnique should return a modified results array - [objA !== objB]', function (done) {

    var ledger = [];
    ledger.push(classBlock);

    var result = helpers.addUnique(ledger, otherClassBlock);

    ledger.push(otherClassBlock);

    assert.equal(ledger, result);
    done();
  });

  it('addUnique should return an unmodified results array - [objA === objB]', function (done) {

    var ledger = [];
    ledger.push(classBlock);

    var result = helpers.addUnique(ledger, classBlock);

    assert.equal(ledger, result);
    done();
  });
});
