# No Disallowed Properties

Rule `no-disallowed-properties` will warn against the use of certain properties. 

## Options

* `properties`: `[array of disallowed properties]` (defaults to empty array `[]`).

## Examples

When `properties` contains a property value of `z-index` as shown below:

```yaml
no-disallowed-properties:
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
