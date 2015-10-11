# No Duplicate Properties

Rule `no-duplicate-properties` will enforce that duplicate properties are not allowed within the same block.

## Options

* `exclude`: `[array of property names to be excluded from this rule]` (defaults to empty array `[]`)


## Examples

When enabled, the following are disallowed:

```scss
.foo {
  margin: 0 0 15px;
  margin: 0;
}
```

### Exclude

When a property is added to the exclude array as shown below then you may place duplicate properties immediately after one another, this is to prevent accidental duplication of properties.

```yml
no-duplicate-properties:
  - 1
  -
    exclude:
      - display
```

When `display` is added to the exclude array the following would be allowed:

```scss
.display-block {
  display: flex;
  display: inline-block;
  float: right;
}
```

When `display` is added to the exclude array the following would be still be disallowed as the duplicate properties are separated by another property:

```scss
.display-block {
  display: flex;
  float: right;
  display: inline-block;
}
```
