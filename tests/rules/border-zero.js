'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('border zero - scss', function () {
  var file = lint.file('border-zero.scss');

  describe('[convention: 0]', function () {
    var config = {
      'border-zero': [
        1,
        {
          'convention': 0
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(3, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[convention: \'0\']', function () {
    var config = {
      'border-zero': 1
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(3, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
  describe('[convention: \'none\']', function () {
    var config = {
      'border-zero': [
        1,
        {
          'convention': 'none'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(2, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });

  describe('invalid convention [convention: \'zero\']', function () {
    // defaults to convention 0
    var config = {
      'border-zero': [
        1,
        {
          'convention': 'zero'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(4, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('border zero - sass', function () {
  var file = lint.file('border-zero.sass');

  describe('[convention: 0]', function () {
    var config = {
      'border-zero': [
        1,
        {
          'convention': 0
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(3, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });

  });

  describe('[convention: \'0\']', function () {
    var config = {
      'border-zero': 1
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(3, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });

  describe('[convention: \'none\']', function () {
    var config = {
      'border-zero': [
        1,
        {
          'convention': 'none'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(2, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });

  });

  describe('invalid convention [convention: \'zero\']', function () {
    // defaults to convention 0
    var config = {
      'border-zero': [
        1,
        {
          'convention': 'zero'
        }
      ]
    };
    it('detects faults', function (done) {
      lint.test(file, config, function (data) {
        lint.assert.equal(4, data.warningCount);
        done();
      });
    });
    it('corrects faults', function (done) {
      lint.fix(file, config, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });
  });
});
