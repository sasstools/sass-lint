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
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/sass/cli.scss --verbose --format JSON';

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
    var command = 'sass-lint -c tests/yml/.stylish-output.yml tests/sass/cli.scss --verbose --format JSON --output tests/cli-output.json',
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
});
