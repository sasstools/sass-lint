/**
 * @fileoverview CheckStyle XML reporter
 * @author Ian Christian Myers
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */

'use strict';

const escapeXML = require('../../helpers').escapeXML;
const getMessageType = require('../../helpers').getMessageType;

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results) {

  let output = '';

  output += '<?xml version="1.0" encoding="utf-8"?>';
  output += '<checkstyle version="4.3">';

  results.forEach(result => {
    const messages = result.messages;
    output += `<file name="${escapeXML(result.filePath)}">`;

    messages.forEach(message => {
      output += [
        `<error line="${escapeXML(message.line)}"`,
        `column="${escapeXML(message.column)}"`,
        `severity="${escapeXML(getMessageType(message))}"`,
        `message="${escapeXML(message.message)}${message.ruleId ? ` (${message.ruleId})` : ''}"`,
        `source="${message.ruleId ? escapeXML(`sass-lint.rules.${message.ruleId}`) : ''}" />`
      ].join(' ');
    });

    output += '</file>';

  });

  output += '</checkstyle>';

  return output;
};
