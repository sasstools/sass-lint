# No Empty Rulesets

Rule `no-empty-rulesets` will enforce that rulesets are not empty.

## Examples

When enabled, the following are disallowed:

```scss
.foo {

}

.bar {
  content: 'baz';

  .qux {}
}

.waldo {}
```
