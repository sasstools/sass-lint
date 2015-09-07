# No Duplicate Properties

Rule `no-duplicate-properties` will enforce that duplicate properties are not allowed within the same block.

## Examples

When enabled, the following are disallowed:

```scss
.foo {
  margin: 0 0 15px;
  margin: 0;
}
```
