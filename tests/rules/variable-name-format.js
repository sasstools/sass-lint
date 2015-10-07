'use strict';

var lint = require('./_lint');

var file = lint.file('variable-name-format.scss');

describe('variable name format', function () {
  //////////////////////////////
  // Variable Name Format - Hyphenated Lowercase
  //////////////////////////////
  it('[convention: hyphenatedlowercase]', function (done) {
    lint.test(file, {
      'variable-name-format': 1
    }, function (data) {
      lint.assert.equal(7, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Variable Name Format - Camel Case
  //////////////////////////////
  it('[convention: camelcase]', function (done) {
    lint.test(file, {
      'variable-name-format': [
        1,
        {
          'convention': 'camelcase'
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Variable Name Format - Snake Case
  //////////////////////////////
  it('[convention: snakecase]', function (done) {
    lint.test(file, {
      'variable-name-format': [
        1,
        {
          'convention': 'snakecase'
        }
      ]
    }, function (data) {
      lint.assert.equal(7, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Variable Name Format - Regular Expression
  //////////////////////////////
  it('[convention: RegExp /^[_A-Z]+$/]', function (done) {
    lint.test(file, {
      'variable-name-format': [
        1,
        {
          'convention': /^[_A-Z]+$/,
          'convention-explanation': 'Its bad and you should feel bad.'
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Variable Name Format - Allow Leading Underscore (False)
  //////////////////////////////
  it('[convention: allow-leading-underscore false]', function (done) {
    lint.test(file, {
      'variable-name-format': [
        1,
        {
          'allow-leading-underscore': false
        }
      ]
    }, function (data) {
      lint.assert.equal(8, data.warningCount);
      done();
    });
  });
});
