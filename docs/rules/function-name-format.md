# Function Name Format

Rule `function-name-format` will enforce a convention for function names.

## Options

* `allow-leading-underscore`: `true`/`false` (defaults to `true`)
* `convention`: `'hyphenatedlowercase'` (default), `camelcase`, `snakecase`, or a Regular Expression that the function name must match (e.g. `^[_A-Z]+$`)
* `convention-explanation`: Custom explanation to display to the user if a function doesn't adhere to the convention

## Example 1

Settings:
- `allow-leading-underscore: true`
- `convention: hyphenatedlowercase`

When enabled, the following are allowed:

```scss
$foo: hyphenated-lowercase();
$foo: _leading-underscore();

.foo {
  content: hyphenated-lowercase();
}

```

When enabled, the following are disallowed:

```scss
$foo: HYPHENATED-UPPERCASE();
$foo: _camelCaseWithLeadingUnderscore();

.foo {
  content: snake_case();
}
```

## Example 2

Settings:
- `allow-leading-underscore: false`
- `convention: camelcase`

When enabled, the following are allowed:

```scss
$foo: camelCase();

.foo {
  content: anotherCamelCase();
}
```

When enabled, the following are disallowed:

```scss
$foo: HYPHENATED-UPPERCASE();
$foo: _camelCaseWithLeadingUnderscore();

.foo {
  content: snake_case();
}
```

## Example 3

Settings:
- `allow-leading-underscore: false`
- `convention: snakecase`

When enabled, the following are allowed:

```scss
$foo: snake_case();

.foo {
  content: another_snake_case();
}
```

When enabled, the following are disallowed:

```scss
$foo: HYPHENATED-UPPERCASE();
$foo: _snake_case_with_leading_underscore();

.foo {
  content: camelCase();
}
```

## Example 4

Settings:
- `allow-leading-underscore: true`
- `convention: '^[_A-Z]+$'`
- `convention-explanation: 'Variables must contain only uppercase letters and underscores'`

When enabled, the following are allowed:

```scss
$foo: SCREAMING_SNAKE_CASE();

.foo {
  content: _LEADING_UNDERSCORE();
}
```

When enabled, the following are disallowed:

(Each line with a variable will report `Variables must contain only uppercase letters and underscores` when linted.)

```scss
$foo: HYPHENATED-UPPERCASE();
$foo: _snake_case_with_leading_underscore();

.foo {
  content: camelCase();
}
```
