'use strict';

module.exports = {
  'name': 'nesting-depth',
  'defaults': {
    'maxDepth': 2
  },
  'detect': function (ast, parser) {
    var result = [],
        nodes = {},
        depth = 0;

    var recursiveSearch = function (node) {
      if (node.contains('block')) {
        node.forEach('block', function (block) {
          if (block.contains('ruleset')) {
            block.forEach('ruleset', function (ruleset) {
              ruleset.forEach('selector', function (selector) {
                depth++;

                if (depth > parser.options.maxDepth) {
                  selector.forEach('simpleSelector', function (simpleSelector) {
                    var nodeLineColumn = simpleSelector.start.line + ':' + simpleSelector.start.column;

                    if (nodes[nodeLineColumn]) {
                      if (depth > nodes[nodeLineColumn].depth) {
                        nodes[nodeLineColumn].depth = depth;
                      }
                    }
                    else {
                      nodes[nodeLineColumn] = {
                        'line': simpleSelector.start.line,
                        'column': simpleSelector.start.column,
                        'depth': depth
                      };
                    }
                  });
                }
              });
              recursiveSearch(ruleset);
            });
          }
        });
      }
      depth--;
    };

    ast.traverseByType('selector', function (selector, i, parent) {
      recursiveSearch(parent);
      depth = 0;
    });

    Object.keys(nodes).forEach(function (node) {
      node = nodes[node];
      result.push({
        'ruleId': parser.rule.name,
        'line': node.line,
        'column': node.column,
        'message': 'Nesting depth ' + node.depth + ' greater than max of ' + parser.options.maxDepth,
        'severity': parser.severity
      });
    });


    return result;
  }
};
