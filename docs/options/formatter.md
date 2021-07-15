# Formatter

Option `formatter` will determine how results from Sass Lint will be formatted for output.

All formatters have been brought across from [eslint](https://github.com/eslint/eslint) and modified slightly to fit the sass-lint package. Please direct issues to sass-lint team from v2 onwards as we no longer directly depend on [eslint](https://github.com/eslint/eslint) for our formatters.

You may also now provide a path to an external format file for sass-lint to use.

The following formatters are available from sass-lint directly

* [checkstyle](http://checkstyle.sourceforge.net/)
* compact
* html
* json
* [junit](http://junit.org/)
* stylish - default
* [tap](https://github.com/sindresorhus/awesome-tap)
* unix
* [visualstudio](https://www.visualstudio.com/)


Not directly available (removed from v1)
* codeframe
* jslint-xml
* table

If you'd still like to use the above formatters then you can either port them across to sass-lint and open a PR up or you may provide a path to the [eslint](https://github.com/eslint/eslint/tree/master/lib/formatters) version of the formatter within your config.

## Options

* Default: `'stylish'`


## Examples

Using the html formatter

```yml
# .sass-lint.yml
---
options:
  # Set the formatter to 'html'
  formatter: html
```

Using an external formatter

```yml
# .sass-lint.yml
---
options:
  # Set the formatter to 'html'
  formatter: path/to/my/awesome/formatter.js
```

## Creating a custom formatter

When building and using a custom formatter you'll want to make sure you follow these very basic outlines.

* Sass-lint expects a function to be returned from your custom formatter.
* An array of objects for each file linted will be passed to this function.
* Each result object will include an array of message objects which include all the lint messages.
* Sass-lint will throw a not found error if your formatter can't be resolved correctly.

```js
// example json formatter

module.exports = function (results) {
  return JSON.stringify(results);
};
```

```js
// example simple formatter

module.exports = function (results) {
  var output = '';

  results.forEach(function (result) {
    var messages = result.messages;
    messages.forEach(function (message) {
      output += 'Problem on line ' + (message.line || 0) + '\n';
    });
  });

  return output;
};
```
