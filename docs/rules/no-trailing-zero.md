# No Trailing Zero

Rule `no-trailing-zero` will enforce that trailing zeros are not allowed.

## Examples

When enabled, the following are disallowed:

```scss
.foo {
  margin: 1.500rem;
}

.foo {
  margin: .500rem;
}

.foo {
  margin: 0.2500rem;
}

.foo {
  margin: 4.0rem;
}
```
