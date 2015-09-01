# Zero Unit

Rule `zero-unit` will enforce whether or not values of `0` used for length should be unitless.

## Options

* `include`: `true`/`false` (defaults to `false`)

## Examples

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  margin: 0;
}

.bar {
  padding: 5px 0 0;
}
```

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  margin: 0px;
}

.bar {
  padding: 5px 0px 0px;
}
```
