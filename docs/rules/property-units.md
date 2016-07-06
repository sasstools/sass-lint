# Property Units

Rule `property-units` will disallow the use of units not specified in `global` or `per-property`. Units specified `per-property` will override the `global` units for that property.

## Options

* `global`: `['em', 'px', 'rem', etc]` defaults to [] or all units allowed
* `per-property`: `{ width: ['rem', 'px', etc], height: ['rem', 'px', etc], }` defaults to {} or no property-specific units

## Examples

When enabled, `global` is set to `['px']`, and `per-property` is set to `{ width: ['rem'] }` the following are disallowed.

```scss
.literal {
    height: 3rem;
}

.literal-property {
    width: 3px;
}

.box-shadow {
  box-shadow: 1em 1em black, 1em 1em black;
}

.background {
  background: 1em solid white;
}

```

When enabled, `global` is set to `['em']`, and `per-property` is set to `{ width: ['rem'] }` the following are allowed.

```scss

.variable {
    width: $sizes.small;
}

.function {
  color: test(2px);
}

//  using literals as property names
$sizes: (
  small: 2px
);
```
