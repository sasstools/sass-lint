# Border Zero

Rule `border-zero` will enforce whether one should use `0` or `none` when specifying a zero `border` value

## Options

* `convention`: `'0'`/`'none'` (defaults to `0`)

> If an invalid convention is provided the rule will default back to `convention: '0'`. An extra warning/error will also be thrown on `line 1` `column 1` of a file with a lint issue to inform you of this fact.

## Examples

When `convention: '0'`, the following are allowed. When `convention: 'none'`, the following are disallowed:

```scss
.foo {
  border: 0;
}

.bar {
  border-right: 0;
}
```

When `convention: 'none'`, the following are allowed. When `convention: '0'`, the following are disallowed:

```scss
.foo {
  border: none;
}

.bar {
  border-left: none;
}
```

### Invalid conventions

When the invalid convention `convention: 'zero'` is supplied, the following are allowed as the rule defaults to `convention: '0'`.

```scss
.foo {
  border: none;
}

.bar {
  border-left: 0;
}
```
