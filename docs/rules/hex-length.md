# Hex Length

Rule `hex-length` will enforce the length of hexadecimal values

## Options

* `style`: `short`/`long` (defaults to `short`)

## Examples

When `style: short`, the following are allowed. When `style: long`, the following are disallowed:

```scss
$foo-color: #456;

.bar {
  background: linear-gradient(top, #3ff, #ddd);
}

.baz {
  color: #fff;
}
```

When `style: long`, the following are allowed. When `style: short`, the following are disallowed:

```scss
$foo-color: #445566;

.bar {
  background: linear-gradient(top, #33ffff, #dddddd);
}

.baz {
  color: #ffffff;
}
```

In both cases the following will be allowed as the values cannot be shortened:

```scss
$quz-color: #abcdef;

.qux {
  color: #123456;
}
```
