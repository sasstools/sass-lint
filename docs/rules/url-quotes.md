# URL Quotes

Rule `url-quotes` will enforce that URLs are wrapped in quotes.

## Examples

When enabled, the following are allowed:

```scss
.foo {
  background-image: url('foo.png');
}

.qux {
  background-image: url('bar/' + $foo);
}

```

When enabled, the following are disallowed:

```scss
.bar {
  background-image: url(foo.png);
}

.norf {
  background-image: url(bar/ + $foo);
}

```
