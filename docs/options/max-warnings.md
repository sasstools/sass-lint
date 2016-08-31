# Max warnings

An error will be thrown if the total number of warnings exceeds the `max-warnings` setting.

## Examples

This can be set as a command-line option:

``` bash
$ sass-lint --max-warnings 50
```

In `.sass-lint.yml`:

``` yaml
options:
  max-warnings: 50
```

Or inside a script:

``` javascript
var sassLint = require('sass-lint'),
    config = {options: {'max-warnings': 50}};

results = sassLint.lintFiles('sass/**/*.scss', config)
sassLint.failOnError(results, config);
```

