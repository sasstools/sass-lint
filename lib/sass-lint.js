'use strict';

var config = require('./config'),
    $ = require('bluebird'),
    groot = require('./groot'),
    glob = $.promisifyAll(require('glob')),
    fs = $.promisifyAll(require('fs')),
    files = config.files ? config.files : config.scss_files;

glob.globAsync(files)
  .then(function (matches) {
    matches.forEach(function (match) {
      fs.readFileAsync(match)
	.then(function (file) {
	  var AST = groot(file);

	  // console.log(AST);
	});
    });
  })
  .catch(function (e) {
    console.error(e);
  });

module.exports = {};