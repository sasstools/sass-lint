/**
 * @fileoverview Tests for checkstyle reporter.
 * @author Ian Christian Myers
 *
 * Updated for use with sass-lint under MIT licence
 * @license https://github.com/sasstools/sass-lint/blob/master/lib/format/LICENSE
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require('chai').assert,
    formatter = require('../../lib/format/formatters/checkstyle');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe('formatter:checkstyle', () => {
  describe('when passed a single error message', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        message: 'Unexpected',
        severity: 2,
        line: 1,
        column: 2,
        ruleId: 'class-name-format'
      }]
    }];

    it('should return a string in the checkstyle format', () => {
      const result = formatter(code);

      assert.equal(result, '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.scss"><error line="1" column="2" severity="error" message="Unexpected (class-name-format)" source="sass-lint.rules.class-name-format" /></file></checkstyle>');
    });

    it('should return a string in the checkstyle format', () => {
      code[0].messages[0].severity = 1;
      const result = formatter(code);

      assert.equal(result, '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.scss"><error line="1" column="2" severity="warning" message="Unexpected (class-name-format)" source="sass-lint.rules.class-name-format" /></file></checkstyle>');
    });
  });

  describe('when passed a message with XML control characters', () => {
    const code = [{
      filePath: '<>&"\'.scss',
      messages: [{
        message: 'Unexpected <>&"\'\b\t\n\f\r牛逼.',
        line: '<',
        column: '>',
        ruleId: 'class-name-format',
        severity: 2,
      }]
    }];

    it('should return a string in the checkstyle format', () => {
      const result = formatter(code);

      assert.equal(result, '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="&lt;&gt;&amp;&quot;&apos;.scss"><error line="&lt;" column="&gt;" severity="error" message="Unexpected &lt;&gt;&amp;&quot;&apos;&#8;&#9;&#10;&#12;&#13;&#29275;&#36924;. (class-name-format)" source="sass-lint.rules.class-name-format" /></file></checkstyle>');
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
        ruleId: 'class-name-format'
      }, {
        message: 'Unexpected bar.',
        severity: 1,
        line: 6,
        column: 11,
        ruleId: 'class-name-format'
      }]
    }];

    it('should return a string with multiple entries', () => {
      const result = formatter(code);

      assert.equal(result, '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.scss"><error line="5" column="10" severity="error" message="Unexpected foo. (class-name-format)" source="sass-lint.rules.class-name-format" /><error line="6" column="11" severity="warning" message="Unexpected bar. (class-name-format)" source="sass-lint.rules.class-name-format" /></file></checkstyle>');
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
        ruleId: 'class-name-format'
      }]
    }, {
      filePath: 'bar.scss',
      messages: [{
        message: 'Unexpected bar.',
        severity: 1,
        line: 6,
        column: 11,
        ruleId: 'class-name-format'
      }]
    }];

    it('should return a string with multiple entries', () => {
      const result = formatter(code);

      assert.equal(result, '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.scss"><error line="5" column="10" severity="error" message="Unexpected foo. (class-name-format)" source="sass-lint.rules.class-name-format" /></file><file name="bar.scss"><error line="6" column="11" severity="warning" message="Unexpected bar. (class-name-format)" source="sass-lint.rules.class-name-format" /></file></checkstyle>');
    });
  });

  describe('when passing single message without rule id', () => {
    const code = [{
      filePath: 'foo.scss',
      messages: [{
        message: 'Unexpected foo.',
        severity: 2,
        line: 5,
        column: 10
      }]
    }];

    it('should return a string in the format filename: line x, col y, Error - z for errors', () => {
      const result = formatter(code);

      assert.equal(result, '<?xml version="1.0" encoding="utf-8"?><checkstyle version="4.3"><file name="foo.scss"><error line="5" column="10" severity="error" message="Unexpected foo." source="" /></file></checkstyle>');
    });
  });
});
