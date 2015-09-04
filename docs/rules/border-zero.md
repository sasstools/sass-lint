# Border Zero

Rule `border-zero` will enforce whether one should use `0` or `none` when specifying a zero `border` value

## Options

* `convention`: `'0'`/`'none'` (defaults to `0`)

## Examples

When `convention: '0'`, the following are allowed. When `convention: 'none'`, the following are disallowed:

```scss
.foo {
  border: 0;
}

.bar {
  border-right: 0;
}
```

When `convention: 'none'`, the following are allowed. When `convention: '0'`, the following are disallowed:

```scss
.foo {
  border: none;
}

.bar {
  border-left: none;
}
```
