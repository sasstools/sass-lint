# Space After Bang

Rule `space-after-bang` will enforce whether or not a space should be included after a bang (`!`).

## Options

* `include`: `true`/`false` (defaults to `false`)

## Examples

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  content: 'bar' !important;
}
```

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  content: 'bar' ! important;
}
```
