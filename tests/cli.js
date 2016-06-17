var assert = require('assert'),
    fs = require('fs-extra'),
    path = require('path'),
    exec = require('child_process').exec;

describe('cli', function () {

  it('should return help instructions', function (done) {
    var command = 'sass-lint -h';

    exec(command, function (err, stdout) {
      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('Usage') > 0);

      return done();
    });
  });

  it('should return a version', function (done) {
    var command = 'sass-lint --version';

    exec(command, function (err, stdout) {
      if (err) {
        return done(err);
      }

      assert(stdout.match(/^[0-9]+.[0-9]+(.[0-9]+)?/));

      return done();
    });
  });

  it('should not try to read and lint a directory', function (done) {
    var command = 'sass-lint "tests/dir-test/**/*.scss" --no-exit --verbose --format json';

    exec(command, function (err, stdout) {
      var result = JSON.parse(stdout);
      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('.scss') !== -1);
      assert(stdout.indexOf('.sass') === -1);
      assert.equal(result.length, 1);
      assert.equal(result[0].filePath, 'tests/dir-test/dir.scss/test.scss');

      return done();
    });
  });

  it('Should accept multiple input paths', function (done) {
    var command = 'sass-lint "tests/cli/cli-error.scss, tests/cli/cli-error.sass" --no-exit --verbose';

    exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('.scss') !== -1);
      assert(stdout.indexOf('.sass') !== -1);

      return done();
    });
  });

  it('Should accept multiple input globs', function (done) {
    var command = 'sass-lint "tests/cli/*.scss, tests/cli/*.sass" --no-exit --verbose';

    exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('.scss') !== -1);
      assert(stdout.indexOf('.sass') !== -1);

      return done();
    });
  });

  it('Should accept multiple input paths from a config file', function (done) {
    var command = 'sass-lint -c tests/yml/.multiple-inputs.yml --no-exit --verbose';

    exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('.scss') !== -1);
      assert(stdout.indexOf('.sass') !== -1);

      return done();
    });
  });

  it('Should accept multiple input paths and multiple ignore paths', function (done) {
    var command = 'sass-lint "tests/cli/cli-error.scss, tests/cli/cli-error.sass" -i "tests/cli/cli-error.scss, tests/cli/cli-error.sass" --no-exit --verbose';

    exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('.scss') === -1);
      assert(stdout.indexOf('.sass') === -1);

      return done();
    });
  });

  it('Should accept multiple input paths and multiple ignores from a config file', function (done) {
    var command = 'sass-lint -c tests/yml/.multiple-ignores.yml --no-exit --verbose';

    exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }
      assert(stdout.indexOf('.scss') === -1);
      assert(stdout.indexOf('.sass') === -1);

      return done();
    });
  });

  it('CLI format option should output JSON', function (done) {
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/cli/cli.scss --verbose --format json';

    exec(command, function (err, stdout) {

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

  it('CLI output option should write to test file', function (done) {
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/cli/cli.scss --verbose --format json --output tests/cli-output.json',
        outputFile = path.resolve(process.cwd(), 'tests/cli-output.json');

    exec(command, function (err) {

      if (err) {
        return done(err);
      }
      else {
        var contents = fs.readFileSync(outputFile, 'utf8');

        if (contents.length > 0) {
          fs.removeSync(outputFile);
          return done();
        }
        else {
          return done(new Error(outputFile + 'is empty'));
        }
      }
    });
  });

  it('CLI output option should write JSON to test file', function (done) {
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/cli/cli.scss --verbose --format json --output tests/cli-output.json',
        outputFile = path.resolve(process.cwd(), 'tests/cli-output.json');

    exec(command, function (err) {

      if (err) {
        return done(err);
      }
      else {
        var contents = fs.readFileSync(outputFile, 'utf8');

        if (contents.length > 0) {

          try {
            JSON.parse(contents);
            fs.removeSync(outputFile);
            return done();
          }
          catch (e) {
            fs.removeSync(outputFile);
            return done(new Error('Written file is not in JSON format'));
          }

        }
        else {
          fs.removeSync(outputFile);
          return done(new Error(outputFile + 'is empty'));
        }
      }
    });
  });

  it('CLI output option should write JSON to test file when upper case format is used', function (done) {
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/cli/cli.scss --verbose --format JSON --output tests/cli-output.json',
        outputFile = path.resolve(process.cwd(), 'tests/cli-output.json');

    exec(command, function (err) {

      if (err) {
        return done(err);
      }
      else {
        var contents = fs.readFileSync(outputFile, 'utf8');

        if (contents.length > 0) {

          try {
            JSON.parse(contents);
            fs.removeSync(outputFile);
            return done();
          }
          catch (e) {
            fs.removeSync(outputFile);
            return done(new Error('Written file is not in JSON format'));
          }

        }
        else {
          fs.removeSync(outputFile);
          return done(new Error(outputFile + 'is empty'));
        }
      }
    });
  });

  // Test custom config path

  it('should return JSON from a custom config', function (done) {
    var command = 'sass-lint -c tests/yml/.color-keyword-errors.yml tests/cli/cli.scss --verbose';

    exec(command, function (err, stdout) {

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
    var command = 'sass-lint -c tests/yml/.json-lint.yml tests/cli/cli.scss --verbose';

    exec(command, function (err, stdout) {

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
    var command = 'sass-lint -c tests/yml/.color-keyword-errors.yml tests/cli/cli.scss --verbose';

    exec(command, function (err, stdout) {

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
    var command = 'sass-lint -c tests/yml/.stylish-errors.yml tests/cli/cli.scss --verbose',
        expectedOutputLength = 154;

    exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      else {
        assert.equal(expectedOutputLength, stdout.length);
        return done();
      }
    });
  });

  it('should not include ignored paths', function (done) {
    var command = 'sass-lint -i "**/*.scss" -v -q --format json "**/cli/*.scss"';

    exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('.scss') === -1);

      return done();
    });
  });

  it('should not include multiple ignored paths', function (done) {
    var command = 'sass-lint -i "**/*.scss, **/*.sass" -q -v --format json';

    exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      assert(stdout.indexOf('.scss') === -1);
      assert(stdout.indexOf('.sass') === -1);

      return done();
    });
  });

  it('should override filename convention if a valid --syntax is provided', function (done) {
    var command = 'sass-lint --syntax scss tests/cli/cli.txt --verbose --format json';

    exec(command, function (err, stdout) {

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

  it('should exit with exit code 1 when quiet', function (done) {
    var command = 'sass-lint -c tests/yml/.error-output.yml tests/cli/cli-error.scss --verbose --no-exit';

    exec(command, function (err) {
      if (err.code === 1) {
        return done();
      }

      return done(new Error('Error code not 1'));
    });
  });

  it('should exit with exit code 1 when more warnings than --max-warnings', function (done) {
    var command = 'sass-lint -c tests/yml/.color-keyword-errors.yml tests/cli/cli.scss --max-warnings 0';

    exec(command, function (err) {
      if (err && err.code === 1) {
        return done();
      }

      return done(new Error('Error code not 1'));
    });
  });

  it('should not exit with an error if no config is specified', function (done) {
    var command = 'sass-lint tests/cli/cli-clean.scss --verbose --no-exit';

    exec(command, function (err) {
      if (!err) {
        return done();
      }

      return done(new Error('Exited with error code 1'));
    });
  });

  /**
   * We disabled eslints handle callback err rule here as we are deliberately throwing errors that we don't care about
   */
  it('parse errors should report as a lint error', function (done) {
    var command = 'sass-lint --config tests/yml/.stylish-output.yml tests/sass/parse.scss --verbose --no-exit --format json';

    exec(command, function (err, stdout) { // eslint-disable-line handle-callback-err
      var result = JSON.parse(stdout)[0];

      assert.equal(1, result.errorCount);
      done();
    });
  });

  it('parse errors should report as severity 2', function (done) {
    var command = 'sass-lint --config tests/yml/.stylish-output.yml tests/sass/parse.scss --verbose --no-exit --format json';

    exec(command, function (err, stdout) { // eslint-disable-line handle-callback-err
      var result = JSON.parse(stdout)[0],
          messages = result.messages[0],
          severity = 2;

      assert.equal(severity, messages.severity);
      done();
    });
  });

  it('parse errors should report the correct message', function (done) {
    var command = 'sass-lint --config tests/yml/.stylish-output.yml tests/sass/parse.scss --verbose --no-exit --format json';

    exec(command, function (err, stdout) { // eslint-disable-line handle-callback-err
      var result = JSON.parse(stdout)[0],
          message = result.messages[0].message,
          expected = 'Please check validity of the block starting from line #5';

      assert.equal(expected, message);
      done();
    });
  });

  it('parse errors rule Id should be \'Fatal\'', function (done) {
    var command = 'sass-lint --config tests/yml/.stylish-output.yml tests/sass/parse.scss --verbose --no-exit --format json';

    exec(command, function (err, stdout) { // eslint-disable-line handle-callback-err
      var result = JSON.parse(stdout)[0],
          messages = result.messages[0],
          ruleId = 'Fatal';

      assert.equal(ruleId, messages.ruleId);
      done();
    });
  });
});
