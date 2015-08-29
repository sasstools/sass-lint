# Space After Comma

Rule `space-after-comma` will enforce whether or not a space should be included after a comma (`,`).

## Options

* `include`: `true`/`false` (defaults to `true`)

## Examples

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  @include baz('foo', 'bar');

  box-shadow: 1px 1px black, 1px 1px black;
}
```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  @include baz('foo','bar');

  box-shadow: 1px 1px black,1px 1px black;
}
```
