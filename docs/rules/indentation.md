# Indentation

Rule `indentation` will enforce an indentation size (in spaces) and ensure that tabs and spaces are not mixed.

## Options

* `size`: `number` (defaults to `2`)

## Examples

When enabled (assuming `size: 2`) the following are allowed:

```scss
.foo {
  content: 'bar';

  .baz {
    content: 'qux';

    // Waldo
    &--waldo {
      content: 'alpha';
    }
  }
}
```

When enabled (assuming `size: 2`) the following are disallowed:

```scss
.foo {
content: 'bar';
   .baz {
  content: 'qux';
  // Waldo
      &--waldo {
        content: 'alpha';
      }
    }
}
```
