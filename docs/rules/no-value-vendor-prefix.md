# No Value Vendor Prefix

Rule `no-value-vendor-prefix` will enforce that vendor prefixes for property value names are not allowed to be used.
We check against Autoprefixers list of prefixable property value names from [caniuse.com](https://caniuse.com). If Autoprefixer would handle the prefixing of a property value automatically for you it will be flagged as invalid here. If the prefixed property value is non standard and Autoprefixer wouldn't handle this for you then this rule will allow it.

## Options

* `additional-identifiers`: `[array of additional prefixes to flag as invalid]` (defaults to empty array `[]`)
* `excluded-identifiers`: `[array of prefixes to exclude checking for]` (defaults to empty array `[]`)

## Examples

When enabled, the following are disallowed:

```scss
.foo { display: -webkit-flex; }
                ^-----------^
.bar { max-width: -moz-max-content; }
                  ^--------------^
.baz { background: -webkit-linear-gradient(bottom, #000, #fff); }
                   ^----------------------^
```
When enabled, the following are allowed:

```scss
.foo { display: flex; }
.bar { max-width: max-content; }
.baz { background: linear-gradient(bottom, #000, #fff); }
.non-standard {display:-webkit-non-standard}
```

### Additional Identifiers

When `additional-identifiers` contains a currently allowed property value name of `-webkit-non-standard` as shown below

```yaml
no-value-vendor-prefix:
  - 1
  -
    additional-identifiers:
      - -webkit-non-standard
```

The following would now also be disallowed

```scss
.non-standard {display: -webkit-non-standard}
                       ^-------------------^
```

### Excluded Identifiers

When `excluded-identifiers` contains currently disallowed property value names such as `-webkit-flex` as shown below

```yaml
no-value-vendor-prefix:
  - 1
  -
    excluded-identifiers:
      - -webkit-flex
```

The following would now be allowed

```scss
.foo { display: -webkit-flex; }
               ^------------^
```
