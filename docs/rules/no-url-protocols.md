# No URL Protocols

Rule `no-url-protocols` will enforce that protocols and domains are not used within urls.

## Options

* `protocol-relative-urls`: `true`/`false` (defaults to `false`)

## Examples

### `protocol-relative-urls`

When `protocol-relative-urls: false`, the following are allowed:

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

When `protocol-relative-urls: false`, the following are disallowed:

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

When `protocol-relative-urls: true`, the following are allowed:

```scss
.foo {
  background-image: url('//foo.com/img/bar.png');
}

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

When `protocol-relative-urls: true`, the following are disallowed:

```scss
.foo {
  background-image: url('https://foo.com/img/bar.png');
}

.foo {
  background-image: url('http://foo.com/img/bar.png');
}
```
