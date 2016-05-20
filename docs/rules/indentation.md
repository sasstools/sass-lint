# Indentation

Rule `indentation` will enforce an indentation size (tabs and spaces) and it will also ensure that tabs and spaces are not mixed.

The mixed warnings and tabs warnings check will always choose the first tab or space that it comes across as the de facto standard for the file it's linting regardless of the options you have in your config. If a tab and a space both appear in the first indented property/block in your file the space will be preferred over the tab. This is purely to make sure you get accurate mixed spaces and tabs warnings throughout the file and any indented elements can be linted correctly.

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
