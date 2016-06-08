# Indentation

Rule `indentation` will enforce an indentation size (tabs and spaces) and it will also ensure that tabs and spaces are not mixed.

The mixed spaces and tabs warnings check will take into account what you have set in your config file whether it should expect to see spaces or tabs. If it encounters a tab anywhere in a file when your rule config doesn't specify tabs it will flag a lint warning, Similarly for any whitespace using spaces when tabs are specified. Obviously spaces between properties and values etc are ignored.

## Options

* `size`: `number` or `'tab'` (defaults to `2` spaces)

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
