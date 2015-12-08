// Note that this file is nearly identical to mixin-name-format.js, placeholder-name-format.js, and variable-name-format.js
'use strict';

var helpers = require('../helpers');
var whitelist = [
  'abs',
  'adjust-color',
  'adjust-hue',
  'alpha',
  'annotation',
  'append',
  'blue',
  'blur',
  'brightness',
  'calc',
  'ceil',
  'change-color',
  'character-variant',
  'circle',
  'complement',
  'contrast',
  'cubic-bezier',
  'custom',
  'darken',
  'desaturate',
  'drop-shadow',
  'element',
  'ellipse',
  'floor',
  'grayscale',
  'green',
  'hue',
  'hue-rotate',
  'hsl',
  'hsla',
  'index',
  'inset',
  'invert',
  'is-hex-str',
  'join',
  'keywords',
  'length',
  'lighten',
  'lightness',
  'linear-gradient',
  'list-separator',
  'map-get',
  'map-has-key',
  'map-keys',
  'map-merge',
  'map-remove',
  'map-values',
  'matrix',
  'matrix3d',
  'min',
  'max',
  'mix',
  'nth',
  'ornaments',
  'opacify',
  'opacity',
  'percentage',
  'perspective',
  'polygon',
  'quote',
  'radial-gradient',
  'random',
  'rect',
  'red',
  'repeat',
  'repeating-linear-gradient',
  'repeating-radial-gradient',
  'rgb',
  'rgba',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'rotate3d',
  'round',
  'saturate',
  'saturation',
  'scale',
  'scale-color',
  'scaleX',
  'scaleY',
  'scaleZ',
  'scale3d',
  'set-nth',
  'sepia',
  'skewX',
  'skewY',
  'steps',
  'str-index',
  'str-insert',
  'str-length',
  'str-slice',
  'styleset',
  'stylistic',
  'swash',
  'symbols',
  'to-lower-case',
  'to-upper-case',
  'translate',
  'translateX',
  'translateY',
  'translateZ',
  'translate3d',
  'tran­spa­ren­tiz­e',
  'unquote',
  'url',
  'var',
  'zip'
];

module.exports = {
  'name': 'function-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false
  },
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('function', function (node) {
      var name = node.first('ident').content,
          strippedName,
          violationMessage = false;

      // ignore functions on whitelist - css3 transforms
      if (whitelist.indexOf(name) !== -1) {
        return;
      }

      strippedName = name;

      if (parser.options['allow-leading-underscore'] && name[0] === '_') {
        strippedName = name.slice(1);
      }

      switch (parser.options.convention) {
      case 'hyphenatedlowercase':
        if (!helpers.isHyphenatedLowercase(strippedName)) {
          violationMessage = 'Function \'' + name + '\' should be written in lowercase with hyphens';
        }
        break;
      case 'camelcase':
        if (!helpers.isCamelCase(strippedName)) {
          violationMessage = 'Function \'' + name + '\' should be written in camelCase';
        }
        break;
      case 'snakecase':
        if (!helpers.isSnakeCase(strippedName)) {
          violationMessage = 'Function \'' + name + '\' should be written in snake_case';
        }
        break;
      default:
        if (!(new RegExp(parser.options.convention).test(strippedName))) {
          violationMessage = 'Function \'' + name + '\' should match regular expression /' + parser.options.convention + '/';

          // convention-message overrides violationMessage
          if (parser.options['convention-explanation']) {
            violationMessage = parser.options['convention-explanation'];
          }
        }
      }

      if (violationMessage) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': violationMessage,
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};
