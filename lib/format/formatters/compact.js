/**
 * @fileoverview Compact reporter
 * @author Nicholas C. Zakas
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */
'use strict';

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns the severity of warning or error
 * @param {Object} message message object to examine
 * @returns {string} severity level
 * @private
 */
const getMessageType = function (message) {
  if (message.severity === 2) {
    return 'Error';
  }
  return 'Warning';

};


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results) {

  let output = '',
      total = 0;

  results.forEach(result => {

    const messages = result.messages;

    total += messages.length;

    messages.forEach(message => {

      output += `${result.filePath}: `;
      output += `line ${message.line || 0}`;
      output += `, col ${message.column || 0}`;
      output += `, ${getMessageType(message)}`;
      output += ` - ${message.message}`;
      output += message.ruleId ? ` (${message.ruleId})` : '';
      output += '\n';

    });

  });

  if (total > 0) {
    output += `\n${total} problem${total !== 1 ? 's' : ''}`;
  }

  return output;
};
