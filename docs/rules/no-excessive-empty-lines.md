# No Excessive Empty Lines

Rule `no-excessive-empty-lines` will disallow excessive amounts of empty lines.

- Consecutive blank lines are not allowed
- Blank lines at the start of a block are not allowed
- Blank lines at the end of a block are not allowed

## Examples

When enabled the following are allowed:

```scss
.foo {
  content: 'bar';
  content: 'baz';

  .waldo {
    content: 'where';
  }
}
```

When enabled the following are disallowed:

```scss


.foo {
  content: 'bar';
  content: 'baz'


  .waldo {
    content: 'where'

  }
}


```
