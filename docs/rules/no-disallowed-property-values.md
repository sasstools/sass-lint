# No Disallowed Property Values

Rule `no-disallowed-property-values` will warn against the use of certain values for properties.

## Options

* `properties`: `{dictionary of properties mapped to array of disallowed values}` (defaults to empty dictionary `{}`).

## Examples

When `properties` contains a property value of `text-transform` as shown below:

```yaml
no-disallowed-property-values:
  - 1
  -
    properties:
      text-transform: ['capitalize']
```

The following would not be allowed:

```scss

// the capitalize value for text-transform is not allowed
.foo {
  text-transform: capitalize;
}

```
