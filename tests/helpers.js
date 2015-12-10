'use strict';

var assert = require('assert'),
    helpers = require('../lib/helpers'),
    gonzales = require('gonzales-pe');

var haystack = [
    {
      prop: 'a',
      propb: 'b'
    },
    {
      prop: 'c',
      propb: 'd'
    }
];

var idNode = gonzales.createNode({
  type: 'id',
  content: [
    gonzales.createNode({
      type: 'ident',
      content: 'header',
      syntax: 'scss',
      start: {
        line: 1,
        column: 2
      },
      end: {
        line: 1,
        column: 7
      }
    })
  ],
  syntax: 'scss',
  start: {
    line: 1,
    column: 1
  },
  end: {
    line: 1,
    column: 7
  }
});


var identNode = gonzales.createNode({
  type: 'ident',
  content: 'input',
  syntax: 'scss',
  start: {
    line: 1,
    column: 1
  },
  end: {
    line: 1,
    column: 5
  }
});


var classNode = gonzales.createNode({
  type: 'class',
  content: [
    gonzales.createNode({
      type: 'ident',
      content: 'header',
      syntax: 'scss',
      start: {
        line: 1,
        column: 2
      },
      end: {
        line: 1,
        column: 7
      }
    })
  ],
  syntax: 'scss',
  start: {
    line: 1,
    column: 1
  },
  end: {
    line: 1,
    column: 7
  }
});


var attributeNode = gonzales.createNode({
  type: 'attribute',
  content: [
    gonzales.createNode({
      type: 'ident',
      content: 'type',
      syntax: 'scss',
      start: {
        line: 1,
        column: 7
      },
      end: {
        line: 1,
        column: 10
      }
    }),
    gonzales.createNode({
      type: 'attributeSelector',
      content: '=',
      syntax: 'scss',
      start: {
        line: 1,
        column: 11
      },
      end: {
        line: 1,
        column: 11
      }
    }),
    gonzales.createNode({
      type: 'ident',
      content: 'radio',
      syntax: 'scss',
      start: {
        line: 1,
        column: 12
      },
      end: {
        line: 1,
        column: 16
      }
    })
  ],
  syntax: 'scss',
  start: {
    line: 1,
    column: 6
  },
  end: {
    line: 1,
    column: 17
  }
});


var pseudoNode = gonzales.createNode({
  type: 'pseudoClass',
  content: [
    gonzales.createNode({
      type: 'ident',
      content: 'last-child',
      syntax: 'scss',
      start: {
        line: 1,
        column: 3
      },
      end: {
        line: 1,
        column: 12
      }
    })
  ],
  syntax: 'scss',
  start: {
    line: 1,
    column: 2
  },
  end: {
    line: 1,
    column: 12
  }
});


var pseudoElementNode = gonzales.createNode({
  type: 'pseudoElement',
  content: [
    gonzales.createNode({
      type: 'ident',
      content: 'first-line',
      syntax: 'scss',
      start: {
        line: 1,
        column: 3
      },
      end: {
        line: 1,
        column: 12
      }
    })
  ],
  syntax: 'scss',
  start: {
    line: 1,
    column: 2
  },
  end: {
    line: 1,
    column: 12
  }
});



var nthSelectorNode = gonzales.createNode({
  type: 'nthSelector',
  content: [
    gonzales.createNode({
      type: 'ident',
      content: 'nth-of-type',
      syntax: 'scss',
      start: {
        line: 1,
        column: 3
      },
      end: {
        line: 1,
        column: 13
      }
    }),
    gonzales.createNode({
      type: 'nth',
      content: '2',
      syntax: 'scss',
      start: {
        line: 1,
        column: 15
      },
      end: {
        line: 1,
        column: 15
      }
    })
  ],
  syntax: 'scss',
  start: {
    line: 1,
    column: 2
  },
  end: {
    line: 1,
    column: 16
  }
});


var spaceNode = gonzales.createNode({
  type: 'space',
  content: ' ',
  syntax: 'scss',
  start: {
    line: 1,
    column: 1
  },
  end: {
    line: 1,
    column: 1
  }
});


var parentSelectorNode = gonzales.createNode({
  type: 'parentSelector',
  content: '&',
  syntax: 'scss',
  start: {
    line: 1,
    column: 1
  },
  end: {
    line: 1,
    column: 1
  }
});


var combinatorNode = gonzales.createNode({
  type: 'combinator',
  content: '+',
  syntax: 'scss',
  start: {
    line: 1,
    column: 6
  },
  end: {
    line: 1,
    column: 6
  }
});



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

var nodeSimpleSelector = {
      type: 'simpleSelector',
      content:
          [
              {
                type: 'ident',
                content: 'h1',
                syntax: 'scss',
                start: { line: 16, column: 1 },
                end: { line: 16, column: 2 },
                indexHasChanged: [ 0 ]
              }
          ],
      syntax: 'scss',
      start: { line: 16, column: 1 },
      end: { line: 16, column: 2 },
      indexHasChanged: [ 0 ]
    },

    nodeDelim = {
      type: 'delimiter',
      content: ',',
      syntax: 'scss',
      start: { line: 16, column: 3 },
      end: { line: 16, column: 3 },
      indexHasChanged: [ 0 ]
    },

    nodeSpace = {
      type: 'space',
      content: ' ',
      syntax: 'scss',
      start: { line: 225, column: 5 },
      end: { line: 225, column: 5 },
      indexHasChanged: [ 0 ]
    };


var detectTestA = {
      line: 1,
      column: 1
    },

    detectTestB = {
      line: 2,
      column: 2
    },

    detectTestC = {
      line: 1,
      column: 2
    };


describe('helpers', function () {

  //////////////////////////////
  // Helpers is loaded
  //////////////////////////////

  it('helpers should not be undefined', function (done) {

    var loaded = typeof (helpers) === 'object' ? true : false;

    assert.equal(true, loaded);
    done();
  });

  //////////////////////////////
  // propertySearch
  //////////////////////////////

  it('propertySearch should not find a property', function (done) {

    var needle = 'e',
        property = 'prop',
        result = helpers.propertySearch(haystack, needle, property);

    assert.equal(-1, result);
    done();
  });

  it('propertySearch should find a property', function (done) {

    var needle = 'a',
        property = 'prop',
        result = helpers.propertySearch(haystack, needle, property);

    assert.equal(0, result);
    done();
  });

  it('propertySearch should find a deeper property', function (done) {

    var needle = 'd',
        property = 'propb',
        result = helpers.propertySearch(haystack, needle, property);

    assert.equal(1, result);
    done();
  });

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

  //////////////////////////////
  // sortDetects
  //////////////////////////////

  it('sortDetects should return -1 - [a.line < b.line]', function (done) {

    var result = helpers.sortDetects(detectTestA, detectTestB);

    assert.equal(-1, result);
    done();
  });

  it('sortDetects should return 1 - [a.line > b.line]', function (done) {

    var result = helpers.sortDetects(detectTestB, detectTestA);

    assert.equal(1, result);
    done();
  });

  it('sortDetects should return 0 - [a === b]', function (done) {

    var result = helpers.sortDetects(detectTestA, detectTestA);

    assert.equal(0, result);
    done();
  });

  it('sortDetects should return -1 - [a.column < b.column]', function (done) {

    var result = helpers.sortDetects(detectTestA, detectTestC);

    assert.equal(-1, result);
    done();
  });

  it('sortDetects should return 1 - [a.column > b.column]', function (done) {

    var result = helpers.sortDetects(detectTestC, detectTestA);

    assert.equal(1, result);
    done();
  });

  //////////////////////////////
  // isNumber
  //////////////////////////////

  it('isNumber - [10 - true]', function (done) {

    var result = helpers.isNumber(10);

    assert.equal(true, result);
    done();
  });

  it('isNumber - [\'10\' - true]', function (done) {

    var result = helpers.isNumber('10');

    assert.equal(true, result);
    done();
  });

  it('isNumber - [\'ten\' - false]', function (done) {

    var result = helpers.isNumber('ten');

    assert.equal(false, result);
    done();
  });

  it('isNumber - [\'ff00ff\' - false]', function (done) {

    var result = helpers.isNumber('ff00ff');

    assert.equal(false, result);
    done();
  });

  //////////////////////////////
  // isUpperCase
  //////////////////////////////

  it('isUpperCase - [\'TEST\' - true]', function (done) {

    var result = helpers.isUpperCase('TEST');

    assert.equal(true, result);
    done();
  });

  it('isUpperCase - [\'test\' - false]', function (done) {

    var result = helpers.isUpperCase('test');

    assert.equal(false, result);
    done();
  });

  it('isUpperCase - [abcDEF - false]', function (done) {

    var result = helpers.isUpperCase('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isUpperCase - [\'123\' - false]', function (done) {

    var result = helpers.isUpperCase('123');

    assert.equal(false, result);
    done();
  });

  //////////////////////////////
  // isLowerCase
  //////////////////////////////

  it('isLowerCase - [\'TEST\' - false]', function (done) {

    var result = helpers.isLowerCase('TEST');

    assert.equal(false, result);
    done();
  });

  it('isLowerCase - [\'test\' - true]', function (done) {

    var result = helpers.isLowerCase('test');

    assert.equal(true, result);
    done();
  });

  it('isLowerCase - [abcDEF - false]', function (done) {

    var result = helpers.isLowerCase('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isLowerCase - [\'123\' - false]', function (done) {

    var result = helpers.isLowerCase('123');

    assert.equal(false, result);
    done();
  });

  //////////////////////////////
  // isCamelCase
  //////////////////////////////

  it('isCamelCase - [\'TEST\' - false]', function (done) {

    var result = helpers.isCamelCase('TEST');

    assert.equal(false, result);
    done();
  });

  it('isCamelCase - [\'test\' - true]', function (done) {

    var result = helpers.isCamelCase('test');

    assert.equal(true, result);
    done();
  });

  it('isCamelCase - [abcDEF - true]', function (done) {

    var result = helpers.isCamelCase('abcDEF');

    assert.equal(true, result);
    done();
  });

  it('isCamelCase - [\'123\' - false]', function (done) {

    var result = helpers.isCamelCase('123');

    assert.equal(false, result);
    done();
  });

  it('isCamelCase - [\'aBcDeF\' - true]', function (done) {

    var result = helpers.isCamelCase('aBcDeF');

    assert.equal(true, result);
    done();
  });

  //////////////////////////////
  // isHyphenatedLowercase
  //////////////////////////////

  it('isHyphenatedLowercase - [\'abc-def\' - true]', function (done) {

    var result = helpers.isHyphenatedLowercase('abc-def');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedLowercase - [\'TEST\' - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('TEST');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedLowercase - [\'test\' - true]', function (done) {

    var result = helpers.isHyphenatedLowercase('test');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedLowercase - [abcDEF - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedLowercase - [\'123\' - true]', function (done) {

    var result = helpers.isHyphenatedLowercase('123');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedLowercase - [\'aBcDeF\' - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('aBcDeF');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedLowercase - [\'abc-\\31\\32\\33\' - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('abc-\\31\\32\\33');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedLowercase - [\'abc-\\+\\*\' - false]', function (done) {

    var result = helpers.isHyphenatedLowercase('abc-\\+\\*');

    assert.equal(false, result);
    done();
  });

  //////////////////////////////
  // isSnakeCase
  //////////////////////////////

  it('isSnakeCase - [\'TEST\' - false]', function (done) {

    var result = helpers.isSnakeCase('TEST');

    assert.equal(false, result);
    done();
  });

  it('isSnakeCase - [\'test\' - true]', function (done) {

    var result = helpers.isSnakeCase('test');

    assert.equal(true, result);
    done();
  });

  it('isSnakeCase - [abcDEF - false]', function (done) {

    var result = helpers.isSnakeCase('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isSnakeCase - [\'123\' - true]', function (done) {

    var result = helpers.isSnakeCase('123');

    assert.equal(true, result);
    done();
  });

  it('isSnakeCase - [\'ab_cd_ef\' - true]', function (done) {

    var result = helpers.isSnakeCase('ab_cd_ef');

    assert.equal(true, result);
    done();
  });

  it('isSnakeCase - [\'ab_cd-ef\' - false]', function (done) {

    var result = helpers.isSnakeCase('ab_cd-ef');

    assert.equal(false, result);
    done();
  });

  //////////////////////////////
  // isHyphenatedBEM
  //////////////////////////////

  it('isHyphenatedBEM - [\'TEST\' - false]', function (done) {

    var result = helpers.isHyphenatedBEM('TEST');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'test\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('test');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedBEM - [abcDEF - false]', function (done) {

    var result = helpers.isHyphenatedBEM('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'abc---def\' - false]', function (done) {

    var result = helpers.isHyphenatedBEM('abc---def');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'abc___def\' - false]', function (done) {

    var result = helpers.isHyphenatedBEM('abc___def');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'ab__cd__ef\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('ab__cd__ef');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedBEM - [\'ab__cd--ef\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('ab__cd--ef');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedBEM - [\'abc_def\' - false]', function (done) {

    var result = helpers.isHyphenatedBEM('abc_def');

    assert.equal(false, result);
    done();
  });

  it('isHyphenatedBEM - [\'abc-def\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('abc-def');

    assert.equal(true, result);
    done();
  });

  it('isHyphenatedBEM - [\'ab-cd__ef\' - true]', function (done) {

    var result = helpers.isHyphenatedBEM('ab-cd__ef');

    assert.equal(true, result);
    done();
  });

  //////////////////////////////
  // isStrictBEM
  //////////////////////////////

  it('isStrictBEM - [\'TEST\' - false]', function (done) {

    var result = helpers.isStrictBEM('TEST');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'test\' - true]', function (done) {

    var result = helpers.isStrictBEM('test');

    assert.equal(true, result);
    done();
  });

  it('isStrictBEM - [abcDEF - false]', function (done) {

    var result = helpers.isStrictBEM('abcDEF');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'abc---def\' - false]', function (done) {

    var result = helpers.isStrictBEM('abc---def');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'abc___def\' - false]', function (done) {

    var result = helpers.isStrictBEM('abc___def');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'ab__cd__ef\' - false]', function (done) {

    var result = helpers.isStrictBEM('ab__cd__ef');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'ab__cd--ef\' - false]', function (done) {

    var result = helpers.isStrictBEM('ab__cd--ef');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'ab__cd_ef_gh\' - true]', function (done) {

    var result = helpers.isStrictBEM('ab__cd_ef_gh');

    assert.equal(true, result);
    done();
  });

  it('isStrictBEM - [\'ab-cd-ef__gh-ij-kl_mn-op-qr_st-uv-wx\' - true]', function (done) {

    var result = helpers.isStrictBEM('ab-cd-ef__gh-ij-kl_mn-op-qr_st-uv-wx');

    assert.equal(true, result);
    done();
  });

  it('isStrictBEM - [\'ab__cd_ef_gh_ij\' - false]', function (done) {

    var result = helpers.isStrictBEM('ab__cd_ef_gh_ij');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'abc_def\' - false]', function (done) {

    var result = helpers.isStrictBEM('abc_def');

    assert.equal(false, result);
    done();
  });

  it('isStrictBEM - [\'abc-def\' - true]', function (done) {

    var result = helpers.isStrictBEM('abc-def');

    assert.equal(true, result);
    done();
  });

  it('isStrictBEM - [\'ab-cd__ef\' - true]', function (done) {

    var result = helpers.isStrictBEM('ab-cd__ef');

    assert.equal(true, result);
    done();
  });

  //////////////////////////////
  // isValidHex
  //////////////////////////////

  it('isValidHex - [\'abcdef\' - true]', function (done) {

    var result = helpers.isValidHex('abcdef');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'ABCDEF\' - true]', function (done) {

    var result = helpers.isValidHex('ABCDEF');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'123456\' - true]', function (done) {

    var result = helpers.isValidHex('123456');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'ABC123\' - true]', function (done) {

    var result = helpers.isValidHex('ABC123');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'abc123\' - true]', function (done) {

    var result = helpers.isValidHex('abc123');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'fff\' - true]', function (done) {

    var result = helpers.isValidHex('fff');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'123\' - true]', function (done) {

    var result = helpers.isValidHex('123');

    assert.equal(true, result);
    done();
  });

  it('isValidHex - [\'efghij\' - false]', function (done) {

    var result = helpers.isValidHex('efghij');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'thj\' - false]', function (done) {

    var result = helpers.isValidHex('thj');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'ab\' - false]', function (done) {

    var result = helpers.isValidHex('ab');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'12\' - false]', function (done) {

    var result = helpers.isValidHex('12');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'1234567\' - false]', function (done) {

    var result = helpers.isValidHex('1234567');

    assert.equal(false, result);
    done();
  });

  it('isValidHex - [\'abc1234\' - false]', function (done) {

    var result = helpers.isValidHex('abc1234');

    assert.equal(false, result);
    done();
  });

  //////////////////////////////
  // loadConfigFile
  //////////////////////////////

  it('loadConfigFile', function (done) {

    var result = helpers.loadConfigFile('../../tests/testFile.txt'),
        expect = 'This is a test file that test\'s the loadConfigFile helper function.';

    assert.equal(expect, result);
    done();
  });

  //////////////////////////////
  // hasEOL
  //////////////////////////////

  it('hasEOL - [\'\\n\' - true]', function (done) {

    var result = helpers.hasEOL('\n');

    assert.equal(true, result);
    done();
  });

  it('hasEOL - [\'\\r\\n\' - true]', function (done) {

    var result = helpers.hasEOL('\r\n');

    assert.equal(true, result);
    done();
  });

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

  //////////////////////////////
  // Strip quotes
  //////////////////////////////

  it('stripQuotes - [double quotes]', function (done) {
    var result = helpers.stripQuotes('"This is a string"'),
        expect = 'This is a string';

    assert.equal(expect, result);
    done();
  });

  it('stripQuotes - [single quotes]', function (done) {
    var result = helpers.stripQuotes('\'This is a string\''),
        expect = 'This is a string';

    assert.equal(expect, result);
    done();
  });

  //////////////////////////////
  // stripPrefix
  //////////////////////////////

  it('stripPrefix - [-webkit-transition - transition]', function (done) {

    var result = helpers.stripPrefix('-webkit-transition');

    assert.equal('transition', result);
    done();
  });

  it('stripPrefix - [-moz-transition - transition]', function (done) {

    var result = helpers.stripPrefix('-moz-transition');

    assert.equal('transition', result);
    done();
  });

  it('stripPrefix - [-webkit-border-color - border-color]', function (done) {

    var result = helpers.stripPrefix('-webkit-border-color');

    assert.equal('border-color', result);
    done();
  });

  //////////////////////////////
  // stripLastSpace
  //////////////////////////////

  it('stripLastSpace - [\'selector \']', function (done) {

    var result = helpers.stripLastSpace('selector ');

    assert.equal('selector', result);
    done();
  });

  it('stripLastSpace - [\'selector test \']', function (done) {

    var result = helpers.stripLastSpace('selector test');

    assert.equal('selector test', result);
    done();
  });

  it('stripLastSpace - [\'selector\']', function (done) {

    var result = helpers.stripLastSpace('selector');

    assert.equal('selector', result);
    done();
  });

  it('stripLastSpace - [\'selector test\']', function (done) {

    var result = helpers.stripLastSpace('selector test');

    assert.equal('selector test', result);
    done();
  });

  //////////////////////////////
  // mapDelims
  //////////////////////////////

  it('mapDelims - selector', function (done) {

    var result = helpers.mapDelims(nodeSimpleSelector);

    assert.equal('s', result);
    done();
  });

  it('mapDelims - delim', function (done) {

    var result = helpers.mapDelims(nodeDelim);

    assert.equal('d', result);
    done();
  });

  it('mapDelims - space', function (done) {

    var result = helpers.mapDelims(nodeSpace);

    assert.equal(false, result);
    done();
  });

  //////////////////////////////
  // isNestable
  //////////////////////////////

  it('isNestable - nest attribute in selector', function (done) {
    var elements = ['selector', 'class', 'id', 'attribute'],
        nestable = ['class', 'selector', 'attribute'],
        previous = 'selector',
        current = 'attribute';

    var result = helpers.isNestable(current, previous, elements, nestable);

    assert.equal(true, result);
    done();
  });

  it('isNestable - nest id in class', function (done) {
    var elements = ['selector', 'class', 'id', 'attribute'],
        nestable = ['class', 'selector', 'attribute'],
        previous = 'class',
        current = 'id';

    var result = helpers.isNestable(current, previous, elements, nestable);

    assert.equal(false, result);
    done();
  });

  //////////////////////////////
  // constructSelector
  //////////////////////////////

  it('constructSelector - id node - [#header]', function (done) {
    var result = helpers.constructSelector(idNode),
        expect = '#header';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - id node - [id]', function (done) {
    var result = helpers.constructSelector(idNode),
        expect = 'id';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - class node - [.header]', function (done) {
    var result = helpers.constructSelector(classNode),
        expect = '.header';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - class node - [class]', function (done) {
    var result = helpers.constructSelector(classNode),
        expect = 'class';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - ident node - [input]', function (done) {
    var result = helpers.constructSelector(identNode),
        expect = 'input';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - ident node - [selector]', function (done) {
    var result = helpers.constructSelector(identNode),
        expect = 'selector';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - attribute node - [type=radio]', function (done) {
    var result = helpers.constructSelector(attributeNode),
        expect = '[type=radio]';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - attribute node - [attribute]', function (done) {
    var result = helpers.constructSelector(attributeNode),
        expect = 'attribute';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - pseudo node - [:last-child]', function (done) {
    var result = helpers.constructSelector(pseudoNode),
        expect = ':last-child';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - pseudo node - [pseudoClass]', function (done) {
    var result = helpers.constructSelector(pseudoNode),
        expect = 'pseudoClass';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - pseudo element node - [::first-line]', function (done) {
    var result = helpers.constructSelector(pseudoElementNode),
        expect = '::first-line';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - pseudo element node - [pseudoElement]', function (done) {
    var result = helpers.constructSelector(pseudoElementNode),
        expect = 'pseudoElement';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - nthSelector node - [:nth-of-type(2)]', function (done) {
    var result = helpers.constructSelector(nthSelectorNode),
        expect = ':nth-of-type(2)';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - nthSelector node - [nthSelector]', function (done) {
    var result = helpers.constructSelector(nthSelectorNode),
        expect = 'nthSelector';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - space node - [ ]', function (done) {
    var result = helpers.constructSelector(spaceNode),
        expect = ' ';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - space node - []', function (done) {
    var result = helpers.constructSelector(spaceNode),
        expect = '';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - parent selector node - [&]', function (done) {
    var result = helpers.constructSelector(parentSelectorNode),
        expect = '&';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - parent selector node - [parentSelector]', function (done) {
    var result = helpers.constructSelector(parentSelectorNode),
        expect = 'parentSelector';

    assert.equal(expect, result.type);
    done();
  });


  it('constructSelector - combinator node - [+]', function (done) {
    var result = helpers.constructSelector(combinatorNode),
        expect = '+';

    assert.equal(expect, result.content);
    done();
  });

  it('constructSelector - combinator node - [combinator]', function (done) {
    var result = helpers.constructSelector(combinatorNode),
        expect = 'combinator';

    assert.equal(expect, result.type);
    done();
  });

  //////////////////////////////
  // attemptTraversal
  //////////////////////////////
  it('attemptTraversal - collect all nodes', function () {
    var stylesheet = gonzales.parse(['',
      '.a {',
      '  .b {',
      '    color: red;',
      '  }',
      '  .c {',
      '    color: blue;',
      '  }',
      '  .d {',
      '    color: green;',
      '  }',
      '}'].join('\n'), { syntax: 'scss' });

    assert.deepEqual(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block', 'declaration', 'property', 'ident'])
        .map(function (node) {
          return node.content;
        }),
      ['color', 'color', 'color']
    );
  });

  it('attemptTraversal - empty array when traversal fails', function () {
    var stylesheet = gonzales.parse(['',
      '.a {',
      '  color: red;',
      '}'].join('\n'), { syntax: 'scss' });

    assert.equal(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block']).length,
      0
    );
  });

  //////////////////////////////
  // collectSuffixExtensions
  //////////////////////////////
  it('collectSuffixExtensions - no extensions', function () {
    var ruleset = gonzales.parse(['',
      '.a {',
      '  .b {',
      '    .c {',
      '      width: 2px;',
      '    }',
      '  }',
      '}'].join('\n'), { syntax: 'scss' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['a']
    );
  });

  it('collectSuffixExtensions - BEM example', function () {
    var ruleset = gonzales.parse(['',
      '.block {',
      '  &__element {',
      '    &--modifier {',
      '      width: 2px;',
      '    }',
      '  }',
      '}'].join('\n'), { syntax: 'scss' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['block', 'block__element', 'block__element--modifier']
    );
  });

  it('collectSuffixExtensions - many parents and children', function () {
    var ruleset = gonzales.parse(['',
      '.a,',
      '.b {',
      '  &c,',
      '  &d {',
      '    &e,',
      '    &f {',
      '      width: 2px;',
      '    }',
      '  }',
      '}'].join('\n'), { syntax: 'scss' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['a', 'b', 'ac', 'bc', 'ad', 'bd', 'ace', 'bce', 'ade', 'bde', 'acf', 'bcf', 'adf', 'bdf']
    );
  });
});
