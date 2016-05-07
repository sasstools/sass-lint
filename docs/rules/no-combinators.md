# No Combinators

Rule `no-combinators` will enforce that the combinators are not allowed to be used.

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
