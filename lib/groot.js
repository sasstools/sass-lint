//////////////////////////////
// Tree Abstraction
//////////////////////////////
'use strict';

var gonzales = require('gonzales-pe-sl');

module.exports = function (text, syntax, filename) {
  var tree;

  // Run `.toString()` to allow Buffers to be passed in
  text = text.toString();

  try {
    tree = gonzales.parse(text, {
      'syntax': syntax
    });
  }
  catch (e) {
    throw {
      message: e.message,
      file: filename,
      line: e.line
    };
  }

  if (typeof tree === 'undefined') {
    throw {
      message: 'Undefined tree',
      file: filename,
      text: text.toString(),
      tree: tree.toString()
    };
  }

  return tree;
};
