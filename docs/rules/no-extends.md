# No Extends

Rule `no-extends` will enforce that extends are not allowed to be used.

## Examples

When enabled, the following are disallowed:

```scss
.foo {
  @extend %bar;
  @extend .bar;
  @extend #bar;
}
```
