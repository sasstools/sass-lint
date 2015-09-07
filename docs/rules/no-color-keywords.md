# Color Keyword

Rule `no-color-keywords` will enforce the use of hexadecimal color values rather than literals.

## Examples

When enabled the following are allowed:

```scss
$new-red: #ff0000;

.foo {
  color: #ff0000;
}

```

When enabled the following are disallowed:

```scss
$new-red: red;

.foo {
  color: red;
}
```
