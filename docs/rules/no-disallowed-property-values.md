# No Disallowed Property Values

Rule `no-disallowed-property-values` will warn against the use of certain values for properties. Either a single string can be specified for a single disallowed value, or an array of disallowed property values.

## Options

* `properties`: `{dictionary of properties mapped to string or array of strings representing values}` (defaults to empty dictionary `{}`).

## Examples

When `properties` contains a the following options for disallowed values of `text-transform` and `white-space`:

```yaml
no-disallowed-property-values:
  - 1
  -
    properties:
      text-transform: capitalize
      white-space: ['pre', 'pre-wrap']
```

The following would not be allowed:

```scss

// the capitalize value for text-transform is not allowed
.foo {
  text-transform: capitalize;
}

// the pre and pre-wrap values for white-space are not allowed
.bar {
  white-space: pre;
}
.baz {
  white-space: pre-wrap;
}
```
