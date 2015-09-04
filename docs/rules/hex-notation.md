# Hex Notation

Rule `hex-notation` will enforce the case of hexadecimal values

## Options

* `style`: `lowercase`/`uppercase` (defaults to `lowercase`)

## Examples

When `style: lowercase`, the following are allowed. When `style: uppercase`, the following are disallowed:

```scss
$foo-color: #fff;

.bar {
  background: linear-gradient(top, #cc2, #44d);
}

.baz {
  color: #12a;
}
```

When `style: uppercase`, the following are allowed. When `style: lowercase`, the following are disallowed:

```scss
$foo-color: #FFF;

.bar {
  background: linear-gradient(top, #CC2, #44D);
}

.baz {
  color: #12A;
}
```

In both cases the following will be allowed as the values contain only numbers:

```scss
.qux {
  color: #123;
}
```
