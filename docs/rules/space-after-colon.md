# Space After Colon

Rule `space-after-colon` will enforce whether or not a space should be included after a colon (`:`).

## Options

* `include`: `true`/`false` (defaults to `true`)

## Examples

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  content: 'bar';
}
```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  content:'bar';
}
```
