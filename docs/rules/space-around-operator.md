# Space Around Operator

Rule `space-around-operator` will enforce whether or not a single space should be included before and after the following operators: `+`, `-`, `/`, `*`, `%`, `<`, `>` `==`, `!=`, `<=` and `>=`.

## Options

* `include`: `true`/`false` (defaults to `true`)

## Examples

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss
.foo {
  margin: 5px + 15px;
}

$foo: 1;
$bar: 3;

.foo {
  margin: $foo + $bar + 'px';
}

$foo: 1 + 1;
$bar: 2 - 1;

@if $foo == $bar {
  $baz: 1;
}

@if ($foo != $bar) {
  $baz: 1;
}
```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss
.foo {
  margin: 5px+15px;
}

$foo: 1;
$bar: 3;

.foo {
  margin: $foo+$bar+'px';
}

$foo: 1+1;
$bar: 2-1;

@if $foo==$bar {
  $baz: 1;
}

@if ($foo!=$bar) {
  $baz: 1;
}
```

When `include: true` or `include: false` multiple spaces around operators are disallowed:

```scss
.foo {
  margin: 5px   +       15px;
}

$foo: 1      +1;
$bar: 2-     1;
```
