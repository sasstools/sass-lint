'use strict';

var lint = require('../index'),
    fs = require('fs');

var file = fs.readFileSync('./foo.scss', 'utf-8');

lint.lintText(file, 'scss', 'foo.scss');