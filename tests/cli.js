var assert = require('assert'),
    should = require('should'),
    fs = require('fs-extra'),
    path = require('path'),
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

  it('CLI format option should output JSON', function (done) {
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/sass/cli.scss --verbose --format json';

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

  it('CLI output option should write to test file', function (done) {
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/sass/cli.scss --verbose --format json --output tests/cli-output.json',
        outputFile = path.resolve(process.cwd(), 'tests/cli-output.json');

    childProcess.exec(command, function (err) {

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
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/sass/cli.scss --verbose --format json --output tests/cli-output.json',
        outputFile = path.resolve(process.cwd(), 'tests/cli-output.json');

    childProcess.exec(command, function (err) {

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
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/sass/cli.scss --verbose --format JSON --output tests/cli-output.json',
        outputFile = path.resolve(process.cwd(), 'tests/cli-output.json');

    childProcess.exec(command, function (err) {

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

  it('should not include ignored paths', function (done) {

    var sassTestsPath = path.join(__dirname, '/sass/'),
        files = [];

    files.push(sassTestsPath + fs.readdirSync(sassTestsPath));

    var command = 'sass-lint -i \'**/*.s+(a|c)ss\'';

    childProcess.exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      files.forEach(function (file) {
        assert(stdout.indexOf(file) === -1);
      });

      done();
    });
  });

  it('should not include multiple ignored paths', function (done) {

    var sassTestsPath = path.join(__dirname, '/sass/'),
        files = [];

    files.push(sassTestsPath + fs.readdirSync(sassTestsPath));

    var command = 'sass-lint -i \'**/*.scss, **/*.sass \'';

    childProcess.exec(command, function (err, stdout) {

      if (err) {
        return done(err);
      }

      files.forEach(function (file) {
        assert(stdout.indexOf(file) === -1);
      });

      done();
    });
  });

  it('should override filename convention if a valid --syntax is provided', function (done) {

    var sassTestsPath = path.join(__dirname, '/sass/'),
        files = [];

    files.push(sassTestsPath + fs.readdirSync(sassTestsPath));

    var command = 'sass-lint --syntax scss tests/sass/cli.txt --verbose';

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
});
