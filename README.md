# Sass Lint [![npm version](https://badge.fury.io/js/sass-lint.svg)](http://badge.fury.io/js/sass-lint) [![Build Status](https://travis-ci.org/sasstools/sass-lint.svg)](https://travis-ci.org/sasstools/sass-lint) [![Coverage Status](https://coveralls.io/repos/sasstools/sass-lint/badge.svg?branch=develop&service=github)](https://coveralls.io/github/sasstools/sass-lint?branch=develop) [![Dependency Status](https://david-dm.org/sasstools/sass-lint.svg)](https://david-dm.org/sasstools/sass-lint#info=dependencies&view=list) [![Dev Dependency Status](https://david-dm.org/sasstools/sass-lint/dev-status.svg)](https://david-dm.org/sasstools/sass-lint#info=devDependencies&view=list)

A Node-only Sass linter for both `sass` and `scss` syntax!

## Install

```
npm install sass-lint --save-dev
```

## Configuring

Use the [Sample Config](docs/sass-lint.yml) as a guide to create your `.sass-lint.yml` in the root of where you are running Sass Lint from. The default configuration can be found [here](https://github.com/sasstools/sass-lint/blob/master/lib/config/sass-lint.yml).

*Migrating from SCSS-Lint*: If you already have a config for SCSS-Lint, you can instantly convert it to the equivalent Sass Lint config at [sasstools.github.io/make-sass-lint-config](http://sasstools.github.io/make-sass-lint-config/).

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

## CLI

Sass Lint [`v1.1.0`](https://github.com/sasstools/sass-lint/releases/tag/v1.1.0) introduced the ability to run Sass Lint through a command line interface. See the [CLI Docs](docs/cli) for full documentation on how to use the CLI.

## Creating Rules

Our AST is [Gonzales-PE](https://github.com/tonyganch/gonzales-pe/tree/dev). Each rule will be passed the full AST which they can traverse as they please. There are many different [node types](https://github.com/tonyganch/gonzales-pe/blob/dev/doc/node-types.md) that may be traversed, and an extensive [API for working with nodes](https://github.com/tonyganch/gonzales-pe/tree/dev#api). The file of the rule must have the same name as the name of the rule. All of the available rules are in our [rules directory](https://github.com/sasstools/sass-lint/tree/develop/lib/rules). Default options will be merged in with user config.

## Task Runner Integration

* [Gulp](https://www.npmjs.com/package/gulp-sass-lint)
* [Grunt](https://github.com/sasstools/grunt-sass-lint)

## IDE Integration

* [Atom](https://atom.io/packages/linter-sass-lint)
* [Sublime Text](https://github.com/skovhus/SublimeLinter-contrib-sass-lint)
