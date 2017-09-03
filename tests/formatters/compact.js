/**
 * @fileoverview Tests for options.
 * @author Nicholas C. Zakas
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require('chai').assert,
    formatter = require('../../lib/format/formatters/compact');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe('formatter:compact', () => {
  describe('when passed no messages', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: []
    }];

    it('should return nothing', () => {
      const result = formatter(code);

      assert.equal(result, '');
    });
  });

  describe('when passed a single message', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        message: 'Unexpected foo.',
        severity: 2,
        line: 5,
        column: 10,
        ruleId: 'foo'
      }]
    }];

    it('should return a string in the format filename: line x, col y, error - z for errors', () => {
      const result = formatter(code);

      assert.equal(result, 'foo.scss: line 5, col 10, error - Unexpected foo. (foo)\n\n1 problem');
    });

    it('should return a string in the format filename: line x, col y, warning - z for warnings', () => {
      code[0].messages[0].severity = 1;
      const result = formatter(code);

      assert.equal(result, 'foo.scss: line 5, col 10, warning - Unexpected foo. (foo)\n\n1 problem');
    });
  });

  describe('when passed a fatal error message', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        severity: 2,
        message: 'Unexpected foo.',
        line: 5,
        column: 10,
        ruleId: 'foo'
      }]
    }];

    it('should return a string in the format filename: line x, col y, error - z', () => {
      const result = formatter(code);

      assert.equal(result, 'foo.scss: line 5, col 10, error - Unexpected foo. (foo)\n\n1 problem');
    });
  });

  describe('when passed multiple messages', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        message: 'Unexpected foo.',
        severity: 2,
        line: 5,
        column: 10,
        ruleId: 'foo'
      }, {
        message: 'Unexpected bar.',
        severity: 1,
        line: 6,
        column: 11,
        ruleId: 'bar'
      }]
    }];

    it('should return a string with multiple entries', () => {
      const result = formatter(code);

      assert.equal(result, 'foo.scss: line 5, col 10, error - Unexpected foo. (foo)\nfoo.scss: line 6, col 11, warning - Unexpected bar. (bar)\n\n2 problems');
    });
  });

  describe('when passed multiple files with 1 message each', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        message: 'Unexpected foo.',
        severity: 2,
        line: 5,
        column: 10,
        ruleId: 'foo'
      }]
    }, {
      filePath: 'bar.scss',
      messages: [{
        message: 'Unexpected bar.',
        severity: 1,
        line: 6,
        column: 11,
        ruleId: 'bar'
      }]
    }];

    it('should return a string with multiple entries', () => {
      const result = formatter(code);

      assert.equal(result, 'foo.scss: line 5, col 10, error - Unexpected foo. (foo)\nbar.scss: line 6, col 11, warning - Unexpected bar. (bar)\n\n2 problems');
    });
  });

  describe('when passed one file not found message', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        severity: 2,
        message: 'Couldn\'t find foo.scss.'
      }]
    }];

    it('should return a string without line and column', () => {
      const result = formatter(code);

      assert.equal(result, 'foo.scss: line 0, col 0, error - Couldn\'t find foo.scss.\n\n1 problem');
    });
  });
});
