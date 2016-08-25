# No URL Protocols

Rule `no-url-protocols` will enforce that protocols and domains are not used within urls.

## Options

* `allow-protocol-relative-urls`: `true`/`false` (defaults to `false`)
> This option is scheduled to be deprecated in favour of the [no-url-domains](https://github.com/sasstools/sass-lint/blob/develop/docs/rules/no-url-domains.md) rule in sass-lint 2.0.

## Examples

### `allow-protocol-relative-urls`


When `allow-protocol-relative-urls: false`, the following are allowed:

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

When `allow-protocol-relative-urls: false`, the following are disallowed:

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

When `allow-protocol-relative-urls: true`, the following are allowed:

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

When `allow-protocol-relative-urls: true`, the following are disallowed:

```scss
.foo {
  background-image: url('https://foo.com/img/bar.png');
}

.foo {
  background-image: url('http://foo.com/img/bar.png');
}
```
