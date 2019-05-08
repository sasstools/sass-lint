# No Multiple Empty Lines

Rule `no-multiple-empty-lines` will disallow multiple consecutive empty lines.

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
