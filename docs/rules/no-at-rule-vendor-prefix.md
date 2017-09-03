# No At Rule Vendor Prefix

Rule `no-at-rule-vendor-prefix` will enforce that vendor prefixes for at rule names are not allowed to be used.
We check against Autoprefixers list of prefixable at rule names from [caniuse.com](https://caniuse.com). If Autoprefixer would handle the prefixing of a at rule automatically for you it will be flagged as invalid here. If the prefixed at rule is non standard and Autoprefixer wouldn't handle this for you then this rule will allow it.

## Options

* `additional-identifiers`: `[array of additional prefixes to flag as invalid]` (defaults to empty array `[]`)
* `excluded-identifiers`: `[array of prefixes to exclude checking for]` (defaults to empty array `[]`)

## Examples

When enabled, the following are disallowed:

```scss
@-webkit-keyframes test {
  0% {
    top: 0;
  }
}
```
When enabled, the following are allowed:

```scss
@-non-standard {
  orientation: landscape;
}

@keyframes test2 {
  0% {
    top: 0;
  }
}
```

### Additional Identifiers

When `additional-identifiers` contains a currently allowed at rule name of `-non-standard` as shown below

```yaml
no-at-rule-vendor-prefix:
  - 1
  -
    additional-identifiers:
      - -non-standard
```

The following would now also be disallowed

```scss
@-non-standard {
  orientation: landscape;
}
```

### Excluded Identifiers

When `excluded-identifiers` contains currently disallowed at rule names such as `-webkit-keyframes` as shown below

```yaml
no-at-rule-vendor-prefix:
  - 1
  -
    excluded-identifiers:
      - -webkit-keyframes
```

The following would now be allowed

```scss
@-webkit-keyframes test {
  0% {
    top: 0;
  }
}
```
