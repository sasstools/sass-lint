# Clean Import Paths

Rule `clean-import-paths` will enforce whether or not `@import` paths should have leading underscores and/or filename extensions.

## Options

* `leading-underscore`: `true`/`false` (defaults to `false`)
* `filename-extension`: `true`/`false` (defaults to `false`)


## Examples

### `leading-underscore`

When `leading-underscore: false`, the following are allowed. When `leading-underscore: true`, the following are disallowed:

```scss
@import 'foo';
@import 'bar/foo';
```

When `leading-underscore: true`, the following are allowed. When `leading-underscore: false`, the following are disallowed:

```scss
@import '_foo';
@import '_bar/foo';
```

---
### `filename-extension`

When `filename-extension: false`, the following are allowed. When `filename-extension: true`, the following are disallowed:

```scss
@import 'foo';
@import 'bar/foo';
```

When `filename-extension: true`, the following are allowed. When `filename-extension: false`, the following are disallowed:

```scss
@import 'foo.scss';
@import 'bar/foo.scss';
```
