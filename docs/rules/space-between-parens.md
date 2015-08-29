# Space Between Parens

Rule `space-between-parens` will enforce whether or not a space should be included before the first item and after the last item inside parenthesis (`()`).

## Options

* `include`: `true`/`false` (defaults to `false`)

## Examples

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
@function foo($bar) {
  @return $bar;
}

@mixin bar($baz) {
  content: $baz;
}

.foo {
  @include bar('Hello');
  content: foo('bar');
  width: calc(100% - 10px);
}
```

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
@function foo( $bar ) {
  @return $bar;
}

@mixin bar($baz ) {
  content: $baz;
}

.foo {
  @include bar( 'Hello' );
  content: foo( 'bar');
  width: calc( 100% - 10px);
}
```
