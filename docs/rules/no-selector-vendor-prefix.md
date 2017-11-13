# No Selector Vendor Prefix

Rule `no-selector-vendor-prefix` will enforce that vendor prefixes for pseudo selector names are not allowed to be used.
We check against Autoprefixers list of prefixable pseudo selector names from [caniuse.com](https://caniuse.com). If Autoprefixer would handle the prefixing of a pseudo selector automatically for you it will be flagged as invalid here. If the prefixed pseudo selector is non standard and Autoprefixer wouldn't handle this for you then this rule will allow it.

## Options

* `additional-identifiers`: `[array of additional prefixes to flag as invalid]` (defaults to empty array `[]`)
* `excluded-identifiers`: `[array of prefixes to exclude checking for]` (defaults to empty array `[]`)

## Examples

When enabled, the following are disallowed:

```scss
dialog::-webkit-backdrop { background: rgba(255, 0, 0, .25); }
      ^-----------------^
```
When enabled, the following are allowed:

```scss
input::placeholder { color: red; }
dialog::-webkit-non-standard { background: rgba(255, 0, 0, .25); }
```

### Additional Identifiers

When `additional-identifiers` contains a currently allowed pseudo selector name of `-webkit-non-standard` as shown below

```yaml
no-selector-vendor-prefix:
  - 1
  -
    additional-identifiers:
      - -webkit-non-standard
```

The following would now also be disallowed

```scss
dialog::-webkit-non-standard { background: rgba(255, 0, 0, .25); }
      ^---------------------^
```

### Excluded Identifiers

When `excluded-identifiers` contains currently disallowed pseudo selector names such as `-webkit-backdrop` as shown below

```yaml
no-selector-vendor-prefix:
  - 1
  -
    excluded-identifiers:
      - -webkit-backdrop
```

The following would now be allowed

```scss
dialog::-webkit-backdrop { background: rgba(255, 0, 0, .25); }
      ^----------------^
```
