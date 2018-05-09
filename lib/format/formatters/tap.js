/**
 * @fileoverview TAP reporter
 * @author Jonathan Kingston
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */

'use strict';

const yaml = require('js-yaml');
const getMessageType = require('../../helpers').getMessageType;

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Takes in a JavaScript object and outputs a TAP diagnostics string
 * @param {Object} diagnostic JavaScript object to be embedded as YAML into output.
 * @returns {string} diagnostics string with YAML embedded - TAP version 13 compliant
 */
const outputDiagnostics = function (diagnostic) {
  const prefix = '  ';
  let output = `${prefix}---\n`;

  output += prefix + yaml.safeDump(diagnostic).split('\n').join(`\n${prefix}`);
  output += '...\n';
  return output;
};

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results) {
  let output = `TAP version 13\n1..${results.length}\n`;

  results.forEach((result, id) => {
    const messages = result.messages;
    let testResult = 'ok';
    let diagnostics = {};

    if (messages.length > 0) {
      testResult = 'not ok';

      messages.forEach(message => {
        const diagnostic = {
          message: message.message,
          severity: getMessageType(message),
          data: {
            line: message.line || 0,
            column: message.column || 0,
            ruleId: message.ruleId || ''
          }
        };

        // If we have multiple messages place them under a messages key
        // The first error will be logged as message key
        // This is to adhere to TAP 13 loosely defined specification of having a message key
        if ('message' in diagnostics) {
          if (typeof diagnostics.messages === 'undefined') {
            diagnostics.messages = [];
          }
          diagnostics.messages.push(diagnostic);
        }
        else {
          diagnostics = diagnostic;
        }
      });
    }

    output += `${testResult} ${id + 1} - ${result.filePath}\n`;

    // If we have an error include diagnostics
    if (messages.length > 0) {
      output += outputDiagnostics(diagnostics);
    }

  });

  return output;
};
