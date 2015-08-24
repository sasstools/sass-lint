'use strict';

var util = require('util');

var helpers = {};

helpers.log = function log (input) {
  console.log(util.inspect(input, false, null));
}

helpers.propertySearch = function (haystack, needle, property) {
  var length = haystack.length,
      i;

  for (i = 0; i < length; i++) {
    if (haystack[i][property] === needle) {
      return i;
    }
  }
  return -1;
}

helpers.isEqual = function (a, b) {
  var startLine = a.start.line === b.start.line ? true : false,
      endLine = a.end.line === b.end.line ? true : false,
      type = a.type === b.type ? true : false,
      length = a.content.length === b.content.length ? true : false;

  if (startLine && endLine && type && length) {
    return true;
  }
  else {
    return false;
  }
}

helpers.isUnique = function (results, item) {
  var search = this.propertySearch(results, item.line, 'line');

  if (search === -1) {
    return true;
  }
  else if (results[search].column === item.column) {
    return false;
  }
  else {
    return true;
  }
}

helpers.addUnique = function(results, item) {
  if (this.isUnique(results, item)) {
    results.push(item);
  }
  return results
}

module.exports = helpers;