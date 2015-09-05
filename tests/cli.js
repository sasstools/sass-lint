var assert = require('assert'),
    should = require('should'),
    childProcess = require('child_process');


describe('CLI', function () {
  describe('#help', function () {
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
  });

  describe('#version', function () {
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
  });
});
