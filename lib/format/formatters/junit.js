/**
 * @fileoverview jUnit Reporter
 * @author Jamund Ferguson
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */
'use strict';

const escapeXML = require('../../helpers').escapeXML;

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

  let output = '';

  output += '<?xml version="1.0" encoding="utf-8"?>\n';
  output += '<testsuites>\n';

  results.forEach(result => {

    const messages = result.messages;

    output += `<testsuite package="org.sassLint" time="0" tests="${messages.length}" errors="${messages.length}" name="${result.filePath}">\n`;
    messages.forEach(message => {
      const type = message.fatal ? 'error' : 'failure';

      output += `<testcase time="0" name="org.sassLint.${message.ruleId || 'unknown'}">`;
      output += `<${type} message="${escapeXML(message.message || '')}">`;
      output += '<![CDATA[';
      output += `line ${message.line || 0}, col `;
      output += `${message.column || 0}, ${getMessageType(message)}`;
      output += ` - ${escapeXML(message.message || '')}`;
      output += (message.ruleId ? ` (${message.ruleId})` : '');
      output += ']]>';
      output += `</${type}>`;
      output += '</testcase>\n';
    });
    output += '</testsuite>\n';

  });

  output += '</testsuites>\n';

  return output;
};
