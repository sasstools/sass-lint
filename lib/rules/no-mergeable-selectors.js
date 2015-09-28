'use strict';

var helpers = require('../helpers');

var constructSelector = function (val) {

  if (val.is('id')) {
    return '#' + val.content;
  }

  else if (val.is('class')) {
    return '.' + val.content;
  }

  else if (val.is('ident')) {
    return val.content;
  }

  else if (val.is('attribute')) {
    var selector = '[';
    val.forEach( function (attrib) {
      selector += constructSelector(attrib);
    });
    return selector + ']';
  }

  else if (val.is('pseudoClass')) {
    return ':' + val.content;
  }

  else if (val.is('pseudoElement')) {
    return '::' + val.content;
  }

  else if (val.is('nth')) {
    return '(' + val.content + ')';
  }

  else if (val.is('nthSelector')) {
    var nthSelector = ':';
    val.forEach( function (attrib) {
      nthSelector += constructSelector(attrib);
    });
    return nthSelector;
  }

  else if (val.is('space')) {
    if (val.content !== ' ') {
      return ' ';
    }
    return val.content;
  }

  else {
    return val.content;
  }
};

module.exports = {
  'name': 'no-mergeable-selectors',
  'defaults': {
    'force-nesting': true,
    'whitelist': []
  },
  'detect': function (ast, parser) {
    var result = [],
        selectorList = [],
        parentSelector = [],
        childBlocks = [1],
        level = 0;

    ast.traverseByType('ruleset', function (ruleset) {
      var selectorBlock = {
            selector: parentSelector.join(' '),
            line: ''
          },
          curSelector = '';

      ruleset.forEach('selector', function (selector) {


        selector.forEach('simpleSelector', function (simpleSelector, i, parent) {
          simpleSelector.forEach(function (val) {

            curSelector += constructSelector(val);
          });
        });

        if (curSelector.charAt(curSelector.length - 1) === ' ') {

          curSelector = curSelector.substr(0, curSelector.length - 1);

        }
        if (level){
          childBlocks[level] -= 1;
        }

        if (ruleset.first('block').contains('ruleset')) {
          ruleset.first('block').forEach('ruleset', function (){

            if (childBlocks[level + 1]) {
              childBlocks[level + 1] += 1;
            }
            else {
              childBlocks[level + 1] = 1;
            }

          });
          parentSelector[level] = curSelector + ' ';
          level ++;
        }
        else {

          for (var i = childBlocks.length - 1; i >=0; i-- ) {
            if (childBlocks[i] === 0) {
              parentSelector.splice(parentSelector.length - 1, 1);

              if (level) {
                level--;
                childBlocks.splice(childBlocks.length - 1, 1);
              }
            }
            else {
              break;
            }
          }
        }

        selectorBlock.line = ruleset.start.line;
        selectorBlock.selector += curSelector;
      });

      var present = helpers.propertySearch(selectorList, selectorBlock.selector, 'selector');
      helpers.log(present);
      if (present !== -1) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': ruleset.start.line,
          'column': ruleset.start.column,
          'message': 'Rule `' + curSelector + '` should be merged with the rule on line ' + selectorList[present].line,
          'severity': parser.severity
        });
      }
      else {
        if (parser.options.whitelist.indexOf(selectorBlock.selector) === -1) {
          selectorList.push(selectorBlock);
        }
      }
    });

    return result;
  }
};
