# Extends Before Declarations

Rule `extends-before-declarations` will enforce that extends should be written before declarations in a ruleset.

## Examples

When enabled, the following are allowed:

```scss
.foo {
  @extend %bar;
  content: 'baz';
}
```

When enabled, the following are disallowed:

```scss
.foo {
  content: 'baz';
  @extend %bar;
}
```
