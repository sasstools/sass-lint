# Variable Name Format

Rule `variable-name-format` will enforce the use of hexadecimal color values rather than literals.

## Options

* `allow-leading-underscore`: `true`/`false` (defaults to `true`)
* `convention`: `'hyphenatedlowercase'` (default), `camelcase`, `snakecase`, or a Regular Expression that the variable name must match (e.g. `[_A-Z]`)
* `convention-explanation`: Custom explanation to display to the user if a variable doesn't adhere to the convention

## Examples

When enabled (assuming `allow-leading-underscore: true` and `convention: hyphenatedlowercase`), the following are allowed:

```scss
$hyphenated-lowercase: 1px;
$_leading-underscore: 1px;

.foo {
  width: $hyphenated-lowercase;
}

```

When enabled (assuming `allow-leading-underscore: true` and `convention: hyphenatedlowercase`), the following are disallowed:

```scss
$HYPHENATED-UPPERCASE: 1px;
$_camelCaseWithLeadingUnderscore: 1px;

.foo {
  width: $snake_case;
}
```
