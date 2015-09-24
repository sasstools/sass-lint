# Space Before Brace

Rule `space-before-brace` will enforce whether or not a space should be included before a brace (`{`).

## Options

* `include`: `true`/`false` (defaults to `true`)

## Examples

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  content: 'bar';

  @include breakpoint {
    content: 'baz';
  }
}

@mixin foo {
  content: 'bar';
}
```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo{
  content: 'bar';

  @include breakpoint{
    content: 'baz';
  }
}

@mixin foo{
  content: 'bar';
}
```
