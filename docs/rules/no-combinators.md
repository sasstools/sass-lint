# No Combinators

Rule `no-combinators` will warn against the use of combinators.

## Examples

When enabled, the following are disallowed:

```scss
.foo > .bar {
  content: 'foo';
}

.foo ~ .bar {
  content: 'bar';
}

.foo + .bar {
  content: 'baz';
}

.foo .bar {
  content: 'qux';
}
```
