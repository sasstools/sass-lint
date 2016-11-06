'use strict';

var lint = require('../index'),
    assert = require('assert'),
    exceptions = require('../lib/exceptions');

describe('failures', function () {
  it('should raise SassLintFailureError if indentation is set to error', function (done) {
    assert.throws(
      function () {
        var results = lint.lintFiles('tests/sass/indentation/indentation-spaces.scss', {rules: {indentation: 2}});  // 14 errors
        lint.failOnError(results); // Set indentation to error
      },
      exceptions.SassLintFailureError
    );
    assert.throws(
      function () {
        var results = lint.lintFiles('tests/sass/indentation/indentation-spaces.scss', {}, 'tests/yml/.indentation-error.yml');  // 14 errors
        lint.failOnError(results); // Set indentation to error
      },
      exceptions.SassLintFailureError
    );

    done();
  });

  it('should not raise error if indentation is only set to warn', function (done) {
    // These should produce 55 warnings and 0 errors
    var directResults = lint.lintFiles('sass/indentation/indentation-spaces.scss', {rules: {indentation: 1}});
    var configResults = lint.lintFiles('sass/indentation/indentation-spaces.scss', {}, 'yml/.indentation-warn.yml');
    lint.failOnError(directResults);
    lint.failOnError(configResults);

    done();
  });

  it('should raise MaxWarningsExceededError if warnings exceed `max-warnings` setting', function (done) {
    assert.throws(
      function () {
        var results = lint.lintFiles('tests/sass/indentation/indentation-spaces.scss', {});  // 55 warnings
        lint.failOnError(results, {options: {'max-warnings': 10}});
      },
      exceptions.MaxWarningsExceededError
    );
    assert.throws(
      function () {
        var results = lint.lintFiles('tests/sass/indentation/indentation-spaces.scss', {});  // 55 warnings
        lint.failOnError(results, {}, 'tests/yml/.max-10-warnings.yml');
      },
      exceptions.MaxWarningsExceededError
    );

    done();
  });

  it('should raise MaxWarningsExceededError if warnings exceed `max-warnings` of zero', function (done) {
    assert.throws(
      function () {
        var results = lint.lintFiles('tests/sass/indentation/indentation-spaces.scss', {});  // 55 warnings
        lint.failOnError(results, {options: {'max-warnings': 0}});
      },
      exceptions.MaxWarningsExceededError
    );
    assert.throws(
      function () {
        var results = lint.lintFiles('tests/sass/indentation/indentation-spaces.scss', {});  // 55 warnings
        lint.failOnError(results, {}, 'tests/yml/.max-0-warnings.yml');
      },
      exceptions.MaxWarningsExceededError
    );

    done();
  });

  it('should not raise error if warnings do not exceed `max-warnings` setting', function (done) {
    var results = lint.lintFiles('sass/indentation/indentation-spaces.scss', {});  // 55 warnings
    lint.failOnError(results, {'max-warnings': 100}); // should succceed
    lint.failOnError(results, {}, 'yml/.max-100-warnings.yml'); // should succeed

    done();
  });

  it('should not raise error if no warnings even if `max-warnings` is zero', function (done) {
    var results = lint.lintFiles('sass/success.scss', {});  // no warnings
    lint.failOnError(results, {'max-warnings': 0}); // should still succceed
    lint.failOnError(results, {}, 'yml/.max-0-warnings.yml'); // should still succeed

    done();
  });
});
