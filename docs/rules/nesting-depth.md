# Nesting Depth

Rule `nesting-depth` will enforce how deeply a selector can be nested.

## Options

* `max-depth`: number (defaults to `2`)

## Examples

When enabled (assuming `max-depth: 2`) the deepest element (`&:hover` and `&--modifier`) are at at depth 2. Any nested selector deeper is disallowed:

```scss
.foo {
  .baz {
    &:hover {
      // Deepest Nest Allowed
    }
  }
}

.block {
  &__element {
    &--modifier {
      // Deepest Nest Allowed
    }
  }
}
```
