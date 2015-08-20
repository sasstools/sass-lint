# Sass Lint [![npm version](https://badge.fury.io/js/sass-lint.svg)](http://badge.fury.io/js/sass-lint)

A Node-only Sass linter for both `sass` and `scss` syntax! See the sample [config file](https://github.com/sasstools/sass-lint/blob/playground/lib/config/sass-lint.yml) to see how to write a configuration file, and our [release issue](https://github.com/sasstools/sass-lint/issues/6) to track what's missing for an initial release.

## Creating Rules

Our AST is [Gonzales-PE](https://github.com/tonyganch/gonzales-pe/tree/dev). Each rule will be passed the full AST which they can traverse as they please. There are many different [node types](https://github.com/tonyganch/gonzales-pe/blob/dev/doc/node-types.md) that may be traversed, and an extensive [API for working with nodes](https://github.com/tonyganch/gonzales-pe/tree/dev#api). The file of the rule must have the same name as the name of the rule. All of the available rules are in our [rules directory](https://github.com/sasstools/sass-lint/tree/playground/lib/rules). Default options will be merged in with user config.

## Road to Release

Keep track of the [path to a full release](https://github.com/sasstools/sass-lint/issues/6). If you can help contribute by writing rules that are missing (or have a rule you really want to see in there and add), please do so! PRs accepted!