# Empty Line Between Blocks

Rule `empty-line-between-blocks` will enforce whether or not nested blocks should include a space between the last non-comment declaration or not.

## Options

* `include`: `true`/`false` (defaults to `true`)
* `allow-single-line-rulesets`: `true`/`false` (defaults to `true`)

## Examples

### `include`

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  content: 'foo';

  .bar {
    content: 'bar';

    // Waldo
    &--baz {
      content: 'baz';
    }
  }
}
```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  content: 'foo';
  .bar {
    content: 'bar';
    // Waldo
    &--baz {
      content: 'baz';
    }
  }
}
```

### `allow-single-line-rulesets`

When `allow-single-line-rulesets: true`, the following are allowed. When `allow-single-line-rulesets: false`, the following are disallowed:

```scss
.foo { content: 'foo'; }
.bar { content: 'bar'; }
.baz { content: 'baz'; }
```
