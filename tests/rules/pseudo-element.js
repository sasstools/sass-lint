'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('pseudo-element - scss', function () {
  var file = lint.file('pseudo-element.scss');

  var byAttribute = function byAttribute (key, value) {
    return function filterByAttribute (element) {
      return element[key].match(value);
    };
  };

  it('enforces double colons for pseudo-elements', function (done) {
    lint.test(file, {
      'pseudo-element': 1
    }, function (data) {
      var pseudoElementRelatedWarnings = data.messages.filter(byAttribute('message', /Pseudo-elements/));
      lint.assert.equal(39, data.warningCount);
      lint.assert.equal(7, pseudoElementRelatedWarnings.length);
      done();
    });
  });

  it('enforces single colon for pseudo-classes', function (done) {
    lint.test(file, {
      'pseudo-element': 1
    }, function (data) {
      var pseudoClassRelatedWarnings = data.messages.filter(byAttribute('message', /Pseudo-classes/));
      lint.assert.equal(39, data.warningCount);
      lint.assert.equal(32, pseudoClassRelatedWarnings.length);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
describe('pseudo-element - sass', function () {
  var file = lint.file('pseudo-element.sass');

  var byAttribute = function byAttribute (key, value) {
    return function filterByAttribute (element) {
      return element[key].match(value);
    };
  };

  it('enforces double colons for pseudo-elements', function (done) {
    lint.test(file, {
      'pseudo-element': 1
    }, function (data) {
      var pseudoElementRelatedWarnings = data.messages.filter(byAttribute('message', /Pseudo-elements/));
      lint.assert.equal(39, data.warningCount);
      lint.assert.equal(7, pseudoElementRelatedWarnings.length);
      done();
    });
  });

  it('enforces single colon for pseudo-classes', function (done) {
    lint.test(file, {
      'pseudo-element': 1
    }, function (data) {
      var pseudoClassRelatedWarnings = data.messages.filter(byAttribute('message', /Pseudo-classes/));
      lint.assert.equal(39, data.warningCount);
      lint.assert.equal(32, pseudoClassRelatedWarnings.length);
      done();
    });
  });
});
