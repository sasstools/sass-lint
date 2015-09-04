var assert = require('assert'),
    should = require('should'),
    child_process = require('child_process');


describe('CLI', function () {
  describe('#help', function () {
    it('should return help instructions', function (done) {

      var command = 'sass-lint -h';

      child_process.exec(command, function(err, stdout, stderr) {
        if (err) return done(err);
        assert(stdout.indexOf('Usage') > 0);
        done(null);
      });

    });
  });

  describe('#version', function () {
    it('should return a version', function (done) {

      var command = 'sass-lint -V';

      child_process.exec(command, function(err, stdout, stderr) {
        if (err) return done(err);
        stdout.should.match(/^[0-9]+.[0-9]+(.[0-9]+)?/);
        done(null);
      });

    });
  });
});
