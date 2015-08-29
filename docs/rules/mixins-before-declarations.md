# Mixins Before Declarations

Rule `mixins-before-declarations` will enforce that mixins should be written before declarations in a ruleset.

## Options

* `exclude`: `['breakpoint', 'mq']` (array of mixin names to be excluded from this rule)

## Examples

When enabled, the following are allowed:

```scss
.foo {
  @include bar;
  content: 'baz';

  @include breakpoint(500px) {
    content: 'qux';
  }

  @include mq(500px) {
    content: 'qux';
  }
}
```

When enabled, the following are disallowed:

```scss
.foo {
  content: 'baz';
  @include baz;
}
```
