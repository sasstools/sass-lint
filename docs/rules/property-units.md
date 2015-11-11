# Property Units

Rule `property-units` will disallow the use of not explicitly allowed units for all properties or specific properties.

Rules for specific properties override the global allowed units list.

## Options

* `globally-allowed-units`: `['em', 'px', 'rem', etc]` defaults to [] or all units allowed
* `units-allowed-for-properties`: `{ width: ['rem'] }` defaults to {} or no property-specific units allowed

## Examples

When enabled, `globally-allowed-units` is set to `['px']`, and `units-allowed-for-properties` is set to `{ width: ['rem'] }` the following are disallowed.

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

When enabled, `globally-allowed-units` is set to `['em']`, and `units-allowed-for-properties` is set to `{ width: ['rem'] }` the following are allowed.

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

