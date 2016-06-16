'use strict';

var assert = require('assert'),
    helpers = require('../../lib/helpers'),
    gonzales = require('gonzales-pe');

var lfBlock = gonzales.createNode(
  {
    type: 'space',
    content: '\n',
    syntax: 'scss',
    start: { line: 1, column: 1 },
    end: { line: 2, column: 1 }
  }),
    crlfBlock = gonzales.createNode(
      {
        type: 'space',
        content: '\r\n',
        syntax: 'scss',
        start: { line: 1, column: 1 },
        end: { line: 2, column: 1 }
      }),
    multiLfBlock = gonzales.createNode(
      {
        type: 'space',
        content: '\n\n',
        syntax: 'scss',
        start: { line: 1, column: 1 },
        end: { line: 3, column: 1 }
      }),
    multiCrLfBlock = gonzales.createNode(
      {
        type: 'space',
        content: '\r\n\r\n',
        syntax: 'scss',
        start: { line: 1, column: 1 },
        end: { line: 3, column: 1 }
      }),
    mixedBlock = gonzales.createNode(
      {
        type: 'space',
        content: '    \n',
        syntax: 'scss',
        start: { line: 1, column: 1 },
        end: { line: 3, column: 1 }
      }),
    spaceBlock = gonzales.createNode(
      {
        type: 'space',
        content: '    ',
        syntax: 'scss',
        start: { line: 1, column: 1 },
        end: { line: 3, column: 1 }
      }),
    classBlock = gonzales.createNode(
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
      }
    );

describe('helpers - isNewLine', function () {
  //////////////////////////////
  // isNewLine
  //////////////////////////////
  it('should return true for a LF style space node', function (done) {
    assert.equal(true, helpers.isNewLine(lfBlock));
    done();
  });

  it('should return true for a multi LF style space node', function (done) {
    assert.equal(true, helpers.isNewLine(multiLfBlock));
    done();
  });

  it('should return true for a CRLF style space node', function (done) {
    assert.equal(true, helpers.isNewLine(crlfBlock));
    done();
  });

  it('should return true for a multi CRLF style space node', function (done) {
    assert.equal(true, helpers.isNewLine(multiCrLfBlock));
    done();
  });

  it('should return true for a mixed space node that contains a new line character', function (done) {
    assert.equal(true, helpers.isNewLine(mixedBlock));
    done();
  });

  it('should return false for a normal space node that doesn\'t contain a new line character', function (done) {
    assert.equal(false, helpers.isNewLine(spaceBlock));
    done();
  });

  it('should return false for a non space node', function (done) {
    assert.equal(false, helpers.isNewLine(classBlock));
    done();
  });

  it('should return false when no node is provided', function (done) {
    assert.equal(false, helpers.isNewLine());
    done();
  });
});
