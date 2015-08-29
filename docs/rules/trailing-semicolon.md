# Trailing Semicolon

Rule `trailing-semicolon` will enforce whether the last declaration in a block should include a semicolon (`;`) or not (`.sass` syntax excluded).

## Options

* `include`: `true`/`false` (defaults to `true`)

## Examples

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  content: 'bar';
  content: 'baz';

  .waldo {
    content: 'where';
  }
}
```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  content: 'bar';
  content: 'baz'

  .waldo {
    content: 'where'
  }
}
```
