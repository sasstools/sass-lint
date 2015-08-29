# Single Line Per Selector

Rule `single-line-per-selector` will enforce whether selectors should be placed on a new line.

## Examples

When enabled, the following are allowed:

```scss
.foo,
.bar {
  content: 'baz';
}
```

When enabled, the following are disallowed:

```scss
.foo, .bar {
  content: 'baz';
}
```
