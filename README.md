# Sass Lint [![npm version](https://badge.fury.io/js/sass-lint.svg)](http://badge.fury.io/js/sass-lint)

[![Join the chat at https://gitter.im/sasstools/sass-lint](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sasstools/sass-lint?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A Node based [Sass](http://sass-lang.com/) linter. Designed (eventually) as a drop-in replacement for [SCSS-Lint](https://github.com/causes/scss-lint).

## Why does this exist?

We love SCSS-Lint, and if we worked in a Ruby environment, there wouldn't be a question as to whether or not we would use it. However, as the vast majority of frontend tooling today is written in Node, many of us would like to see this tool be available not as Node bindings into Ruby, but as a truly stand-alone Node project. For many people, and many organisation, using languages that are not already established (in their environment) can almost be impossible to do. Since much of our existing frontend tool chains are in Node, supporting it in our environments is a known cost, but the cost of supporting Ruby and it's overhead (RVM, rbenv, Bundler, RubyGems, all additional cost and all potential addition point of failure) can be simply unjustifiable for new projects. Coupled with [Libsass](http://github.com/sass/libsass) getting closer and closer to full Ruby Sass parity, many teams have in fact transitioned to a full Node stack and have dropped (or are loooking to drop) Ruby dependencies all together for new and existing projects. This would provide them with a way of doing so.

There are signifigant gains we can make with a native Node project beyond removing the Ruby dependency. To start, we gain Node's tremendous speed and the ability to work directly with native file streams (which will boost speed even more by negating the need to touch the file system). We can also take the opportunity architect the projet to better align with the Node ecosystem, including building it to be fully pluggable like [ESLint](https://github.com/eslint/eslint) and providing 1st class support for Node task runners like [Grunt](http://gruntjs.com/) and [Gulp](http://gulpjs.com/).
