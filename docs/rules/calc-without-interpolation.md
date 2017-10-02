# Calc Without Interpolation

Rule `calc-without-interpolation` will enforce that variables are interpolated inside `calc()` expressions.

## Examples

When enabled, the following uses of `calc()` are disallowed:

```scss
.foo {
  margin: calc( $foo + $bar );
}

.foo {
  margin: calc( $foo * $bar );
}
```

The rules above need to be rewritten to the following in order to pass the validation:

```scss
.foo {
  margin: calc( #{$foo} + #{$bar} );
}

.foo {
  margin: calc( #{$foo} * #{$bar} );
}
```
