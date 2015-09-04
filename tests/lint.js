'use strict';

var eslint = require('eslint'),
    glob = require('glob'),
    should = require('should');

var cli = new eslint.CLIEngine();
var formatter = cli.getFormatter();

var report;

describe('code style guide', function () {
  it('library files should follow our JavaScript style guide', function (done) {
    var files = glob.sync('lib/**/*.js');
    files.push('index.js');
    files.push('bin/sass-lint.js');

    report = cli.executeOnFiles(files);
    if (report.errorCount > 0 || report.warningCount > 0) {
      console.log(formatter(report.results));
    }

    should(report.errorCount).equal(0);
    should(report.warningCount).equal(0);
    done();
  });

  it('tests/main.js should follow our JavaScript style guide', function (done) {
    report = cli.executeOnFiles(['tests/main.js']);
    if (report.errorCount > 0 || report.warningCount > 0) {
      console.log(formatter(report.results));
    }

    should(report.errorCount).equal(0);
    should(report.warningCount).equal(0);
    done();
  });

  it('tests/cli.js should follow our JavaScript style guide', function (done) {
    report = cli.executeOnFiles(['tests/cli.js']);
    if (report.errorCount > 0 || report.warningCount > 0) {
      console.log(formatter(report.results));
    }

    should(report.errorCount).equal(0);
    should(report.warningCount).equal(0);
    done();
  });

  it('tesst/lint.js should follow our JavaScript style guide', function (done) {
    cli = new eslint.CLIEngine({
      'rules': {
        'no-console': 0
      }
    });
    report = cli.executeOnFiles(['tests/lint.js']);
    if (report.errorCount > 0 || report.warningCount > 0) {
      console.log(formatter(report.results));
    }

    should(report.errorCount).equal(0);
    should(report.warningCount).equal(0);
    done();
  });
});
