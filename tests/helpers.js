'use strict';

var assert = require('assert'),
    helpers = require('../lib/helpers'),
    gonzales = require('gonzales-pe-sl');

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

  it('stripPrefix - [-moz-osx-font-smoothing - font-smoothing]', function (done) {

    var result = helpers.stripPrefix('-moz-osx-font-smoothing');

    assert.equal('font-smoothing', result);
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
  // attemptTraversal
  //////////////////////////////
  it('attemptTraversal - SCSS - collect all nodes', function () {
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

  it('attemptTraversal - SCSS - empty array when traversal fails', function () {
    var stylesheet = gonzales.parse(['',
      '.a {',
      '  color: red;',
      '}'].join('\n'), { syntax: 'scss' });

    assert.equal(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block']).length,
      0
    );
  });

  it('attemptTraversal - Sass - collect all nodes', function () {
    var stylesheet = gonzales.parse(['',
      '.a',
      '  .b',
      '    color: red',
      '  .c',
      '    color: blue',
      '  .d',
      '    color: green',
      ''].join('\n'), { syntax: 'sass' });

    assert.deepEqual(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block', 'declaration', 'property', 'ident'])
        .map(function (node) {
          return node.content;
        }),
      ['color', 'color', 'color']
    );
  });

  it('attemptTraversal - Sass - empty array when traversal fails', function () {
    var stylesheet = gonzales.parse(['',
      '.a',
      '  color: red',
      ''].join('\n'), { syntax: 'sass' });

    assert.equal(
      helpers.attemptTraversal(stylesheet, ['ruleset', 'block', 'ruleset', 'block']).length,
      0
    );
  });

  //////////////////////////////
  // collectSuffixExtensions
  //////////////////////////////
  it('collectSuffixExtensions - SCSS - no extensions', function () {
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

  it('collectSuffixExtensions - SCSS - BEM example', function () {
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

  it('collectSuffixExtensions - SCSS - many parents and children', function () {
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

  it('collectSuffixExtensions - Sass - no extensions', function () {
    var ruleset = gonzales.parse(['',
      '.a',
      '  .b',
      '    .c',
      '      width: 2px',
      ''].join('\n'), { syntax: 'sass' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['a']
    );
  });

  it('collectSuffixExtensions - Sass - BEM example', function () {
    var ruleset = gonzales.parse(['',
      '.block',
      '  &__element',
      '    &--modifier',
      '      width: 2px',
      ''].join('\n'), { syntax: 'sass' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['block', 'block__element', 'block__element--modifier']
    );
  });

  it('collectSuffixExtensions - Sass - many parents and children', function () {
    var ruleset = gonzales.parse(['',
      '.a, .b',
      '  &c, &d',
      '    &e, &f',
      '      width: 2px',
      ''].join('\n'), { syntax: 'sass' })
      .first('ruleset');

    assert.deepEqual(
      helpers.collectSuffixExtensions(ruleset, 'class').map(function (node) {
        return node.content;
      }),
      ['a', 'b', 'ac', 'bc', 'ad', 'bd', 'ace', 'bce', 'ade', 'bde', 'acf', 'bcf', 'adf', 'bdf']
    );
  });
});
