var assert = require('assert'),
    should = require('should'),
    childProcess = require('child_process'),
    fs = require('fs');


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

  it('should not include ignored paths', function (done) {
    var sassTestsPath = 'tests/sass/',
        files = [];

    files.push(sassTestsPath + fs.readdirSync('tests/sass')[0]);
    files.push(sassTestsPath + fs.readdirSync('tests/sass')[1]);

    var command = 'sass-lint -v -i ' + files;

    childProcess.exec(command, function (err, stdout) {
      if (err) {
        return done(err);
      }

      files.forEach(function (file) {
        assert(stdout.indexOf(file) === -1);
      });

      done(null);
    });

  });
});
