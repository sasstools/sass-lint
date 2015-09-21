# No URL Protocols

Rule `no-url-protocols` will enforce that protocols and domains are not used within urls.

## Examples

When enabled, the following are allowed:

```scss
.foo {
  background-image: url('/img/bar.png');
}

.foo {
  background-image: url('img/bar.png');
}

.foo {
  background-image: url('bar.png');
}
```

When enabled, the following are disallowed:

```scss
.foo {
  background-image: url('https://foo.com/img/bar.png');
}

.foo {
  background-image: url('http://foo.com/img/bar.png');
}

.foo {
  background-image: url('//foo.com/img/bar.png');
}
```
