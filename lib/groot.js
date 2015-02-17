//////////////////////////////
// Tree Abstraction
//////////////////////////////
'use strict';

var $ = require('bluebird'),
    gonzales = require('gonzales-pe'),
    src = 'a { color: red }';

var groot = function (file) {
  var AST;


  // file = file.toString();

  // AST = gonzales.parse(file);
  AST = gonzales.parse(src);

  return AST;
}

module.exports = groot;