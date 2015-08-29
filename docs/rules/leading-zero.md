# Leading Zero

Rule `leading-zero` will enforce whether or not decimal numbers should include a leading zero.

## Options

* `include`: `true`/`false` (defaults to `false`)

## Examples

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  font-size: .5em;
}
```

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  font-size: 0.5em;
}
```
