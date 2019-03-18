# No Media Feature Vendor Prefix

Rule `no-media-feature-vendor-prefix` will enforce that vendor prefixes for media feature names are not allowed to be used.
We check against Autoprefixers list of prefixable media feature names from [caniuse.com](https://caniuse.com). If Autoprefixer would handle the prefixing of a media feature automatically for you it will be flagged as invalid here. If the prefixed media feature is non standard and Autoprefixer wouldn't handle this for you then this rule will allow it.

## Options

* `additional-identifiers`: `[array of additional prefixes to flag as invalid]` (defaults to empty array `[]`)
* `excluded-identifiers`: `[array of prefixes to exclude checking for]` (defaults to empty array `[]`)

## Examples

When enabled, the following are disallowed:

```scss
@media (-webkit-min-device-pixel-ratio: 1) {}
        ^-----------------------------^
```
When enabled, the following are allowed:

```scss
@media (-non-standard-min-resolution: 96dpi) {}
        ^---------------------------^
```

### Additional Identifiers

When `additional-identifiers` contains a currently allowed media feature name of `-non-standard-min-resolution` as shown below

```yaml
no-media-feature-vendor-prefix:
  - 1
  -
    additional-identifiers:
      - -non-standard-min-resolution
```

The following would now also be disallowed

```scss
@media (-non-standard-min-resolution: 96dpi) {}
        ^---------------------------^
```

### Excluded Identifiers

When `excluded-identifiers` contains currently disallowed media feature names such as `-webkit-min-device-pixel-ratio` as shown below

```yaml
no-media-feature-vendor-prefix:
  - 1
  -
    excluded-identifiers:
      - -webkit-min-device-pixel-ratio
```

The following would now be allowed

```scss
@media (-webkit-min-device-pixel-ratio: 1) {}
        ^-----------------------------^
```
