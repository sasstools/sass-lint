'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe('indentation - scss', function () {
  var spaceFile = lint.file('indentation/indentation-spaces.scss');
  var tabFile = lint.file('indentation/indentation-tabs.scss');

  it('[size: 2]', function (done) {
    lint.test(spaceFile, {
      'indentation': 1
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
      done();
    });
  });

  it('[size: tab]', function (done) {
    lint.test(tabFile, {
      'indentation': [
        1,
        {
          size: 'tab'
        }
      ]
    }, function (data) {
      lint.assert.equal(10, data.warningCount);
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
