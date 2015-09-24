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
