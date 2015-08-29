# Empty Line Between Blocks

Rule `empty-line-between-blocks` will enforce whether or not nested blocks should include a space between the last non-comment declaration or not.

## Options

* `include`: `true`/`false` (defaults to `true`)

## Examples

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  content: 'bar';

  .baz {
    content: 'qux';

    // Waldo
    &-- {
      content: 'alpha';
    }
  }
}
```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  content: 'bar';
  .baz {
    content: 'qux';
    // Waldo
    &-- {
      content: 'alpha';
    }
  }
}
```
