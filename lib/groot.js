//////////////////////////////
// Tree Abstraction
//////////////////////////////
'use strict';

var gonzales = require('gonzales-pe');

module.exports = function (text, syntax, filename) {
  var fileInfo = filename ? ' at ' + filename : '',
      tree;

  // Run `.toString()` to allow Buffers to be passed in
  text = text.toString();

  try {
    tree = gonzales.parse(text, {
      'syntax': syntax
    });
  }
  catch (e) {
    throw new Error('Parsing error' + fileInfo + ': ' + e.message);
  }

  if (typeof tree === 'undefined') {
    throw new Error('Undefined tree' + fileInfo + ': ' + text.toString() + ' => ' + tree.toString());
  }

  return tree;
};
