//////////////////////////////
// Tree Abstraction
//////////////////////////////
'use strict';

var $ = require('bluebird'),
    gonzales = require('gonzales-pe'),
    variables = [],
    _ = require('underscore');

var lint = function (declaration) {


  if (!declaration.is('declaration')) return;

  var property = declaration.first('property');
  if (property.contains('variable')) {
    variables.push({
      name: property.toCSS('scss'),
      value: declaration.first('value').toCSS('scss'),
      position: property.start
    });
  }

}

var groot = function (file) {
  var ast;


  file = file.toString();

  // AST = gonzales.parse(file);
  ast = gonzales.parse(file, {syntax: 'scss'});

  ast.map(lint);
  console.log(variables);
  return ast;
}

module.exports = groot;