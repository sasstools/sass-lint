# Sass Lint [![npm version](https://badge.fury.io/js/sass-lint.svg)](http://badge.fury.io/js/sass-lint)

A Node-only Sass linter for both `sass` and `scss` syntax! See the sample [config file](https://github.com/sasstools/sass-lint/blob/master/lib/config/sass-lint.yml) to see how to write a configuration file, and our [release issue](https://github.com/sasstools/sass-lint/issues/6) to track what's missing for an initial release.

## Install

```
npm install sass-lint@{{version-number}}
```

where `{{version number}}` is the version number in [`package.json`](https://github.com/sasstools/sass-lint/blob/master/package.json#L3)

## Configuring

Copy the [Sample Config](https://github.com/sasstools/sass-lint/blob/master/lib/config/sass-lint.yml) to `.sass-lint.yml` from the root of where you are running Sass Lint from.

### Options

The following are options that you can use to config the Sass Linter.

#### Files

The `files` option can either be set to a [glob](https://github.com/isaacs/node-glob) or it can be set to an object, where the key `include` is set to the glob you want to include, and `ignore` set to either a glob string or an array of glob strings that you would like to ignore.

#### Rules

For all [rules](#rules), setting their severity to `0` turns it off, setting to `1` sets it as a warning (something that should not be committed in), and setting to `2` set it to an error (something that should not be written). If a rule is set to just a severity, it will use the default configuration (where available).

If you want to configure options, set the rule to an array, where the first item in the array is the severity, and the second item in the array is an object including the options you would like to set.

## Creating Rules

Our AST is [Gonzales-PE](https://github.com/tonyganch/gonzales-pe/tree/dev). Each rule will be passed the full AST which they can traverse as they please. There are many different [node types](https://github.com/tonyganch/gonzales-pe/blob/dev/doc/node-types.md) that may be traversed, and an extensive [API for working with nodes](https://github.com/tonyganch/gonzales-pe/tree/dev#api). The file of the rule must have the same name as the name of the rule. All of the available rules are in our [rules directory](https://github.com/sasstools/sass-lint/tree/playground/lib/rules). Default options will be merged in with user config.

## Road to Release

Keep track of the [path to a full release](https://github.com/sasstools/sass-lint/issues/6). If you can help contribute by writing rules that are missing (or have a rule you really want to see in there and add), please do so! PRs accepted!

## Task Runner Integration

* [Gulp](https://www.npmjs.com/package/gulp-sass-lint)
* [Grunt](https://github.com/sasstools/grunt-sass-lint)
