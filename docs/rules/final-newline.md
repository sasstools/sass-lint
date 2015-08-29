# Final Newline

Rule `final-newline` will enforce whether or not files should end with a newline.

## Options

* `include`: `true`/`false` (defaults to `true`)

## Examples

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  content: 'bar';
}
// Newline under this comment at end of file

```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  content: 'bar';
}
// No newline under this comment at end of file
```
