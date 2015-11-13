'use strict';

var lint = require('../../index'),
    assert = require('assert'),
    fs = require('fs'),
    path = require('path');

module.exports.file = function (file) {
  var result = {};
  file = path.join(process.cwd(), 'tests', 'sass', file);

  result = {
    'text': fs.readFileSync(file),
    'format': path.extname(file).replace('.', ''),
    'filename': path.basename(file)
  };

  return result;
};

module.exports.test = function (text, options, cb) {
  var results;

  options = {
    'options': {
      'merge-default-rules': false,
      'cache-config': false
    },
    'rules': options
  };

  results = lint.lintText(text, options);

  cb(results);
};

module.exports.assert = assert;
