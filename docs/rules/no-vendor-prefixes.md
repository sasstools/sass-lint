# No Vendor Prefixes

Rule `no-vendor-prefixes` will enforce that vendor prefixes are not allowed to be used.

List of prefixes affected by default:
* webkit
* moz
* ms

## Options

* `additional-identifiers`: `[array of additional prefixes to check for]` (defaults to empty array `[]`)
* `excluded-identifiers`: `[array of prefixes to exclude checking for]` (defaults to empty array `[]`)
* `ignore-non-standard`: `true`:`false` (defaults to `false`)

## Examples

When enabled, the following are disallowed:

```scss
@-webkit-keyframes anim {
  0% { opacity: 0; }
}

.ms-block {
  -ms-hyphenate-limit-lines: no-limit;
}

::-moz-placeholder {
  content: '';
}

.foo {
  -webkit-transition: none;
}

.bar {
  position: -moz-sticky;
}
```

### Additional Identifiers

When `additional-identifiers` contains a custom prefix value of `khtml` as show below

```yaml
no-vendor-prefixes:
  - 1
  -
    additional-identifiers:
      - khtml
```

The following would now also be disallowed

```scss
.baz {
  position: -khtml-sticky;
}
```

### Excluded Identifiers

When `excluded-identifiers` contains currently disallowed prefix values such as `webkit` and `moz` as show below

```yaml
no-vendor-prefixes:
  - 1
  -
    excluded-identifiers:
      - webkit
      - moz
```

The following would now be allowed

```scss
@-webkit-keyframes anim {
  0% { opacity: 0; }
}

::-moz-placeholder {
  content: '';
}

.foo {
  -webkit-transition: none;
}

.bar {
  position: -moz-sticky;
}
```

While the following would remain disallowed

```scss

.ms-block {
  -ms-hyphenate-limit-lines: no-limit;
}
```

### Ignore Non Standard

`ignore-non-standard` is an option that allows you to specify whether only standard properties from our [properties list](https://github.com/sasstools/sass-lint/blob/master/data/properties.yml) should be affected by this rule or if any prefixed property / element should be affected.

When `ignore-non-standard` is set to `false` the following are disallowed, when `ignore-non-standard` is set to `true` the following are allowed:

```scss

html {
  -webkit-tap-highlight-color: $link-color-hover;
}

button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
```
