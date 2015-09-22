var assert = require('assert'),
    should = require('should'),
    childProcess = require('child_process');


describe('cli', function () {
  it('should return help instructions', function (done) {
    var command = 'sass-lint -h';

    childProcess.exec(command, function (err, stdout) {
      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('Usage') > 0);

      done(null);
    });

  });

  it('should return a version', function (done) {
    var command = 'sass-lint -V';

    childProcess.exec(command, function (err, stdout) {
      if (err) {
        return done(err);
      }

      should(stdout).match(/^[0-9]+.[0-9]+(.[0-9]+)?/);

      done(null);
    });

  });

  // Test custom config path

  it('should return JSON from a custom config', function (done) {
    var command = 'sass-lint -c tests/yml/.color-keyword-errors.yml tests/sass/cli.scss --verbose';

    childProcess.exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }
      else {
        try {
          JSON.parse(stdout);
          return done();
        }
        catch (e) {
          return done(new Error('Not JSON'));
        }
      }
    });
  });

  // Test 0 errors/warnings when rules set to 0 in config

  it('output should return no errors/warnings', function (done) {
    var command = 'sass-lint -c tests/yml/.json-lint.yml tests/sass/cli.scss --verbose';

    childProcess.exec(command, function (err, stdout) {

      var result = 0;

      if (err) {
        return done(err);
      }
      result = stdout.length;

      if (result !== 0) {
        return done(new Error('warnings/errors were returned'));
      }

      return done();
    });
  });

  // Test 1 warning when rules set to 0 in config

  it('should return a warning', function (done) {
    var command = 'sass-lint -c tests/yml/.color-keyword-errors.yml tests/sass/cli.scss --verbose';

    childProcess.exec(command, function (err, stdout) {

      var result = '';

      if (err) {
        return done(err);
      }

      else {
        try {
          result = JSON.parse(stdout);
        }
        catch (e) {
          return done(new Error('Not JSON'));
        }

        if (result[0].warningCount === 1 && result[0].errorCount === 0) {
          return done();
        }
        else {
          return done(new Error('warnings/errors were expected to be returned but weren\'t'));
        }
      }
    });
  });

  it('should return a warning - stylish', function (done) {
    var command = 'sass-lint -c tests/yml/.stylish-errors.yml tests/sass/cli.scss --verbose',
        expectedOutputLength = 155;

    childProcess.exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      else {
        assert.equal(expectedOutputLength, stdout.length);
        done();
      }
    });
  });
});
