# Shorthand Values

Rule `shorthand-values` will enforce that values in their shorthand form are as concise as specified.

## Options

* `allowed-shorthands`: `[array of allowed shorthand lengths]` (defaults to `[1, 2, 3]`)

## Examples

When `allowed-shorthands` is left at default, the following is enforced:

```yml
# .sass-lint.yml
shorthand-values: 1
```

```scss
margin: 1px 1px 1px 1px;

// Will be enforced to 1 value
margin: 1px;
```
```scss
margin: 1px 2px 1px 2px;

// Will be enforced to 2 values
margin: 1px 2px;
```
```scss
margin: 1px 2px 3px 2px;

// Will be enforced to 3 values
margin: 1px 2px 3px;
```

When `allowed-shorthands` is `[1]`, the following is enforced:

```yml
# .sass-lint.yml
shorthand-values:
  - 1
  -
    allowed-shorthands:
      - 1
```

```scss
margin: 1px 1px 1px 1px;

// Will be enforced to 1 value
margin: 1px;
```

Any value that can't be shortened to 1 value will be unenforced
```scss
// Could be shortened to 2 values but will not generate a warning
margin: 1px 2px 1px 2px;
```

When `allowed-shorthands` is `[1, 2]`, the following is enforced:

```yml
# .sass-lint.yml
shorthand-values:
  - 1
  -
    allowed-shorthands:
      - 1
      - 2
```

```scss
margin: 1px 1px 1px 1px;

// Will be enforced to 1 value
margin: 1px;
```

```scss
margin: 1px 2px 1px 2px;

// Will be enforced to 2 values
margin: 1px 2px;
```

Any value that can't be shortened to 2 values will be unenforced
```scss
// Could be shortened to 3 values but will not generate a warning
margin: 1px 2px 3px 2px;
```
