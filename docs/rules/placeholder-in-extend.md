# Placeholder in Extend

Rule `placeholder-in-extend` will enforce whether extends should only include placeholder selectors.

## Examples

When enabled, the following are allowed:

```scss
.foo {
  @extend %bar;
  @extend .baz%qux;
}
```

When enabled, the following are disallowed:

```scss
.foo {
  @extend .bar;
  @extend #baz;
}
```
