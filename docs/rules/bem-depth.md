# BEM Depth

Rule `bem-depth` will enforce how many elements a BEM selector can contain.

## Options

* `max-depth`: number (defaults to `1`)

## Examples

When enabled (assuming `max-depth: 1`) the following are disallowed:

```scss

.block {
  &__element {
    &__subelement {
      // two elements
    }
  }
}

.block__element__subelement__subelement-two {
  // three elements
}
```
