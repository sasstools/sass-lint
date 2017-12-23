//////////////////////////////
// Tree Abstraction
//////////////////////////////
'use strict';

var gonzales = require('gonzales-pe-sl');
var matter = require('gray-matter');

module.exports = function (input, syntax, filename) {
  var tree;
  var result = matter(input, {});
  var text = result.content;

  if (result.matter) {
    var emptyLines = new Array(result.matter.split('\n').length + 2).join('\n');
    text = emptyLines + result.content;
  }

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
