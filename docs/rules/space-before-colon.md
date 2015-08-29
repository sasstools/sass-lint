# Space Before Colon

Rule `space-before-colon` will enforce whether or not a space should be included before a colon (`:`).

## Options

* `include`: `true`/`false` (defaults to `false`)

## Examples

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  content: 'bar';
}
```

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  content :'bar';
}
```
