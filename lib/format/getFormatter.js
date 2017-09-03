'use strict';

const path = require('path');

/**
 * Returns the formatter representing the given format or null if no formatter
 * with the given name can be found.
 * @param {string} [format] The name of the format to load or the path to a custom formatter.
 * @param {Object} [config] The user defined config
 * @returns {Function} The formatter function or null if not found.
 */
const getFormatter = function (format, config) {

  let formatterPath;

  // default is stylish
  format = format || 'stylish';

  // only strings are valid formatters
  if (typeof format === 'string') {

    // replace \ with / for Windows compatibility
    format = format.replace(/\\/g, '/');

    // if there's a slash, then it's a file
    if (format.indexOf('/') > -1) {
      const cwd = config && config.options && config.options.cwd || process.cwd();

      formatterPath = path.resolve(cwd, format);
    }
    else {
      formatterPath = `./formatters/${format}`;
    }

    try {
      return require(formatterPath);
    }
    catch (ex) {
      ex.message = `There was a problem loading formatter: ${formatterPath}\nError: ${ex.message}`;
      throw ex;
    }

  }
  else {
    return null;
  }
};


module.exports = getFormatter;
