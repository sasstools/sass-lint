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