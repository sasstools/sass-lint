# No Color Hex

Rule `no-color-hex` will disallow the use of hexadecimal colors

## Examples

When enabled the following are disallowed.

```scss
$foo-color: #456;

.bar {
  background: linear-gradient(top, #3ff, #ddd);
}

.baz {
  color: #fff;
}
```

When enabled the following are allowed:

```scss
$foo-color: red;

.bar {
  background: linear-gradient(top, blue, green);
}

.baz {
  color: white;
}
```
