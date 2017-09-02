/**
 * @fileoverview JSON reporter
 * @author Burak Yigit Kaya aka BYK
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */
'use strict';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function (results) {
  return JSON.stringify(results);
};
