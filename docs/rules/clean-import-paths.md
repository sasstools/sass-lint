# Clean Import Paths

Rule `clean-import-paths` will enforce whether or not import paths should have leading underscores and/or filename extensions.

## Options

* `leading-underscore`: `true`/`false` (defaults to false)
* `filename-extension`: `true`/`false` (defaults to false)


## Examples

When neither `leading-underscore` or `filename-extension` are set to `true`, the following are allowed:

```scss
// Clean paths
@import 'foo';
@import 'bar/foo';
```

When neither `leading-underscore` or `filename-extension` are set to `true`, the following are disallowed:

```scss
@import 'foo.scss';
@import 'bar/foo.scss';

@import '_foo';
@import 'bar/_foo';

@import '_foo.scss';
@import 'bar/_foo.scss';
```
