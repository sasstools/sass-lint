# No Vendor Prefixes

Rule `no-vendor-prefixes` will enforce that vendor prefixes are not allowed to be used.

List of prefixes affected by default:
* webkit
* moz
* ms

## Options

* `additional-identifiers`: `[array of additional prefixes to check for]` (defaults to empty array `[]`)
* `excluded-identifiers`: `[array of prefixes to exclude checking for]` (defaults to empty array `[]`)

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

When `additional-identifiers` contains a custom prefix value of `test` as show below

```yaml
no-vendor-prefix:
  - 1
  -
    'additional-identifiers':
      - 'khtml'
```

The following would now also be disallowed

```scss
.baz {
  position: -khtml-sticky;
}
```

When `excluded-identifiers` contains currently disallowed prefix values such as `webkit` and `moz` as show below

```yaml
no-vendor-prefix:
  - 1
  -
    'excluded-identifiers':
      - 'webkit'
      - 'moz'
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
