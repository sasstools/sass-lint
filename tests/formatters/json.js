/**
 * @fileoverview Tests for JSON reporter.
 * @author Burak Yigit Kaya aka BYK
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require('chai').assert,
    formatter = require('../../lib/format/formatters/json');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe('formatter:json', () => {
  const code = [{
    filePath: 'foo.scss',
    messages: [{
      message: 'Unexpected foo.',
      severity: 2,
      line: 5,
      column: 10,
      ruleId: 'foo',
    }]
  }, {
    filePath: 'bar.scss',
    messages: [{
      message: 'Unexpected bar.',
      severity: 1,
      line: 6,
      column: 11,
      ruleId: 'bar',
    }]
  }];

  it('should return passed results as a JSON string without any modification', () => {
    const result = JSON.parse(formatter(code));

    assert.deepEqual(result, code);
  });
});
