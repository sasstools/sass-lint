# No Trailing Whitespace

Rule `no-trailing-whitespace` will enforce that trailing whitespace is not allowed.

## Examples

When enabled, the following are disallowed (\s denotes spaces or tabs):

```scss
.foo {\s
  margin: 1.5rem;
}

.foo {
  margin: .5rem;\s
}

.foo {
  margin: .4rem;
}\s
```
