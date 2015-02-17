'use strict';

var config = require('./config'),
    $ = require('bluebird'),
    glob = $.promisifyAll(require('glob')),
    files = config.files ? config.files : config.scss_files;

glob.globAsync(files)
  .then(function (matches) {
    console.log(matches);
  })
  .catch(function (e) {
    console.error(e);
  });

module.exports = {};