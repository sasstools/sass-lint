# One Declaration Per Line

Rule `one-declaration-per-line` will enforce that new declarations must begin on new lines.

## Examples

When enabled, the following are allowed:

```scss
.foo {
  content: 'baz';
  content: 'qux';
}
```

When enabled, the following are disallowed:

```scss
.foo {content: 'baz', content: 'qux'};

.foo {
  content: 'baz'; content: 'qux';
}
```
