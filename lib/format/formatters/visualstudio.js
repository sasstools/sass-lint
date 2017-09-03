/**
 * @fileoverview Visual Studio compatible formatter
 * @author Ronald Pijnacker
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */

'use strict';

const getMessageType = require('../../helpers').getMessageType;

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
      output += result.filePath;
      output += `(${message.line || 0}`;
      output += message.column ? `,${message.column}` : '';
      output += `): ${getMessageType(message)}`;
      output += message.ruleId ? ` ${message.ruleId}` : '';
      output += ` : ${message.message}`;
      output += '\n';
    });
  });

  if (total === 0) {
    output += 'no problems';
  }
  else {
    output += `\n${total} problem${total !== 1 ? 's' : ''}`;
  }

  return output;
};
