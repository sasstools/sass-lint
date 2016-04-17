# Variable Name Format

Rule `variable-name-format` will enforce a convention for variable names.

## Options

* `allow-leading-underscore`: `true`/`false` (defaults to `true`)
* `convention`: `'hyphenatedlowercase'` (default), `camelcase`, `snakecase`, or a Regular Expression that the variable name must match (e.g. `^[_A-Z]+$`)
* `convention-explanation`: Custom explanation to display to the user if a variable doesn't adhere to the convention

## Example 1

Settings:
- `allow-leading-underscore: true`
- `convention: hyphenatedlowercase`

When enabled, the following are allowed:

```scss
$hyphenated-lowercase: 1px;
$_leading-underscore: 1px;

.foo {
  width: $hyphenated-lowercase;
}

```

When enabled, the following are disallowed:

```scss
$HYPHENATED-UPPERCASE: 1px;
$_camelCaseWithLeadingUnderscore: 1px;

.foo {
  width: $snake_case;
}
```

## Example 2

Settings:
- `allow-leading-underscore: false`
- `convention: camelcase`

When enabled, the following are allowed:

```scss
$camelCase: 1px;

.foo {
  width: $anotherCamelCase;
}
```

When enabled, the following are disallowed:

```scss
$HYPHENATED-UPPERCASE: 1px;
$_camelCaseWithLeadingUnderscore: 1px;

.foo {
  width: $snake_case;
}
```

## Example 3

Settings:
- `allow-leading-underscore: false`
- `convention: snakecase`

When enabled, the following are allowed:

```scss
$snake_case: 1px;

.foo {
  width: $another_snake_case;
}
```

When enabled, the following are disallowed:

```scss
$HYPHENATED-UPPERCASE: 1px;
$_snake_case_with_leading_underscore: 1px;

.foo {
  width: $camelCase;
}
```

## Example 4

Settings:
- `allow-leading-underscore: true`
- `convention: ^[_A-Z]+$`
- `convention-explanation: 'Variables must contain only uppercase letters and underscores'`

When enabled, the following are allowed:

```scss
$SCREAMING_SNAKE_CASE: 1px;

.foo {
  width: $_LEADING_UNDERSCORE;
}
```

When enabled, the following are disallowed:

(Each line with a variable will report `Variables must contain only uppercase letters and underscores` when linted.)

```scss
$HYPHENATED-UPPERCASE: 1px;
$_snake_case_with_leading_underscore: 1px;

.foo {
  width: $camelCase;
}
```
