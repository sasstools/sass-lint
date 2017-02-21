# Formatter

Option `formatter` will determine how results from Sass Lint will be formatted for output.

## Options

Any of the supported [ESLint Formatters](http://eslint.org/docs/user-guide/command-line-interface#-f---format) can be used. Defaults to `stylish`

Example:
```
sass-lint --config sass-lint.yml `**/*.scss` -v -q -f html -o results.html
```

or with long form flags

```
sass-lint --config sass-lint.yml `**/*.scss` --verbose --no-exit --formatter html --output-file results.html
```
