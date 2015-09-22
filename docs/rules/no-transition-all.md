# No Transition All

Rule `no-transition-all` will enforce whether the keyword `all` can be used with the `transition` or `transition-property` property.

## Examples

When enabled the following are disallowed

```scss
.foo {
  transition: all 2s;
}

.bar {
  transition-property: all 2s;
}

.quz {
  -webkit-transition: all 2s, height 2s, background-color 2s, -webkit-transform 2s;
}
```
