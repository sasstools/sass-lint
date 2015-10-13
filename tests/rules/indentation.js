'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('indentation - scss', function () {
  var file = lint.file('indentation.scss');

  it('[size: 2]', function (done) {
    lint.test(file, {
      'indentation': 1
    }, function (data) {
      lint.assert.equal(9, data.warningCount);
      done();
    });
  });
});


//////////////////////////////
// Sass syntax tests
//////////////////////////////
// describe('indentation - sass', function () {
//   var file = lint.file('indentation.sass');
//
//   // Indentation
//   it('[size: 2]', function (done) {
//     lint.test(file, {
//       'indentation': 1
//     }, function (data) {
//       lint.assert.equal(8, data.warningCount);
//       done();
//     });
//   });
// });
