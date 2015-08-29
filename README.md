# Sass Lint [![npm version](https://badge.fury.io/js/sass-lint.svg)](http://badge.fury.io/js/sass-lint) [![Build Status](https://travis-ci.org/sasstools/sass-lint.svg)](https://travis-ci.org/sasstools/sass-lint)

A Node-only Sass linter for both `sass` and `scss` syntax!

## Install

```
npm install sass-lint --save-dev
```

## Configuring

Copy the [Sample Config](lib/config/sass-lint.yml) to `.sass-lint.yml` from the root of where you are running Sass Lint from.

### Options

The following are options that you can use to config the Sass Linter.

#### Files

The `files` option can either be set to a [glob](https://github.com/isaacs/node-glob) or it can be set to an object, where the key `include` is set to the glob you want to include, and `ignore` set to either a glob string or an array of glob strings that you would like to ignore.

#### Rules

For all [rules](docs/rules), setting their severity to `0` turns it off, setting to `1` sets it as a warning (something that should not be committed in), and setting to `2` set it to an error (something that should not be written). If a rule is set to just a severity, it will use the default configuration (where available).

If you want to configure options, set the rule to an array, where the first item in the array is the severity, and the second item in the array is an object including the options you would like to set.

An example configuration of a rule with options look like the following:

```yml
indentation:
  - 2
  -
    size: 2
```

## Creating Rules

Our AST is [Gonzales-PE](https://github.com/tonyganch/gonzales-pe/tree/dev). Each rule will be passed the full AST which they can traverse as they please. There are many different [node types](https://github.com/tonyganch/gonzales-pe/blob/dev/doc/node-types.md) that may be traversed, and an extensive [API for working with nodes](https://github.com/tonyganch/gonzales-pe/tree/dev#api). The file of the rule must have the same name as the name of the rule. All of the available rules are in our [rules directory](https://github.com/sasstools/sass-lint/tree/playground/lib/rules). Default options will be merged in with user config.

## Task Runner Integration

* [Gulp](https://www.npmjs.com/package/gulp-sass-lint)
* [Grunt](https://github.com/sasstools/grunt-sass-lint)
