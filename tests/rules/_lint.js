'use strict';

var lint = require('../../index'),
    assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec;

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
module.exports.fix = function (file, options, cb) {
  var self = this
  var tmp = '.tmp-' + Date.now() + '-' + file.filename

  fs.writeFile(path.join(process.cwd(), 'tests', 'sass', tmp), file.text, 'utf8', function (err) {
    assert.equal(err, null)
    tmp = self.file(tmp)

    var embeddedOptions = {
      'options': {
        'merge-default-rules': false,
        'cache-config': false
      },
      'rules': options,
      'fix': true
    };
    var results = lint.lintText(tmp, embeddedOptions);
    self.test(tmp, options, function () {
      exec('rm ' + tmp.filename, function () {
        cb(results);
      })
    });
  })
};
module.exports.assert = assert;
