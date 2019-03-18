# No Property Vendor Prefix

Rule `no-property-vendor-prefix` will enforce that vendor prefixes for properties are not allowed to be used.
We check against Autoprefixers list of prefixable properties from [caniuse.com](https://caniuse.com). If Autoprefixer would handle the prefixing of a property automatically for you it will be flagged as invalid here. If the prefixed property is non standard and Autoprefixer wouldn't handle this for you then this rule will allow it.

## Options

* `additional-identifiers`: `[array of additional prefixes to flag as invalid]` (defaults to empty array `[]`)
* `excluded-identifiers`: `[array of prefixes to exclude checking for]` (defaults to empty array `[]`)

## Examples

When enabled, the following are disallowed:

```scss
.foo {
  -webkit-transform: scale(1);
}
```
When enabled, the following are allowed:

```scss
.foo {
  -webkit-touch-callout: none;
}
```

### Additional Identifiers

When `additional-identifiers` contains a currently allowed property value of `-webkit-touch-callout` as shown below

```yaml
no-property-vendor-prefix:
  - 1
  -
    additional-identifiers:
      - -webkit-touch-callout
```

The following would now also be disallowed

```scss
.baz {
  -webkit-touch-callout: none;
}
```

### Excluded Identifiers

When `excluded-identifiers` contains currently disallowed prefixed properties such as `-webkit-transform` as shown below

```yaml
no-property-vendor-prefix:
  - 1
  -
    excluded-identifiers:
      - -webkit-transform
```

The following would now be allowed

```scss
.foo {
  -webkit-transform: scale(1)
}
```
