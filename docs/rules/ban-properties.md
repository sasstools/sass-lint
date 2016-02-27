# Ban properties

Rule `ban-properties` will disallow usage of certain properties

## Options

* `properties`: `[array of banned properties]` (defaults to empty array `[]`).

## Examples

When `properties` contains a property value of `z-index` as shown below:

```yaml
ban-properties:
  - 1
  -
    'properties':
      - 'z-index'
```

The following would not be allowed:

```scss

// z-index property is not allowed
.foo {
  z-index: 10;
}

```
