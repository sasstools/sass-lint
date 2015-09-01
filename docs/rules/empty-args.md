# Empty Args

Rule `empty-args` will enforce whether or not parenthesis should be included if no arguments are defined or used, when declaring or invoking a mixin.

## Options

* `include`: `true`/`false` (defaults to `false`)

## Examples

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
@mixin bar {
  color: orange;
}

.bar {
  @include bar;
}
```

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
@mixin foo() {
  color: red;
}

.foo {
  @include foo();
}
```
