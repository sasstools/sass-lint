# Extends Before Mixins

Rule `extends-before-mixins` will enforce that extends should be written before mixins in a ruleset.

## Examples

When enabled, the following are allowed.:

```scss
.foo {
  @extend %bar;
  @include baz;
}
```

When enabled, the following are disallowed:

```scss
.foo {
  @include baz;
  @extend %bar;
}
```
