# Placeholder Name Format

Rule `placeholder-name-format` will enforce a convention for placeholder names.

## Options

* `allow-leading-underscore`: `true`/`false` (defaults to `true`)
* `convention`: `'hyphenatedlowercase'` (default), `camelcase`, `snakecase`, or a Regular Expression that the variable name must match (e.g. `^[_A-Z]+$`)
* `convention-explanation`: Custom explanation to display to the user if a placeholder doesn't adhere to the convention

## Example 1

Settings:
- `allow-leading-underscore: true`
- `convention: hyphenatedlowercase`

When enabled, the following are allowed:

```scss
%hyphenated-lowercase {
  content: '';
}

%_leading-underscore {
  content: '';
}

.foo {
  @extend %hyphenated-lowercase;
}

```

When enabled, the following are disallowed:

```scss
%HYPHENATED-UPPERCASE {
  content: '';
}

%_camelCaseWithLeadingUnderscore {
  content: '';
}

.foo {
  @extend %snake_case;
}
```

## Example 2

Settings:
- `allow-leading-underscore: false`
- `convention: camelcase`

When enabled, the following are allowed:

```scss
%camelCase {
  content: '';
}

.foo {
  @extend %anotherCamelCase;
}
```

When enabled, the following are disallowed:

```scss
%HYPHENATED-UPPERCASE {
  content: '';
}

%_camelCaseWithLeadingUnderscore {
  content: '';
}

.foo {
  @extend %snake_case;
}
```

## Example 3

Settings:
- `allow-leading-underscore: false`
- `convention: snakecase`

When enabled, the following are allowed:

```scss
%snake_case {
  content: '';
}

.foo {
  @extend %another_snake_case;
}
```

When enabled, the following are disallowed:

```scss
%HYPHENATED-UPPERCASE {
  content: '';
}

%_snake_case_with_leading_underscore {
  content: '';
}

.foo {
  @extend %camelCase;
}
```

## Example 4

Settings:
- `allow-leading-underscore: true`
- `convention: ^[_A-Z]+$`
- `convention-explanation: 'Mixins must contain only uppercase letters and underscores'`

When enabled, the following are allowed:

```scss
%SCREAMING_SNAKE_CASE {
  content: '';
}

.foo {
  @extend %_LEADING_UNDERSCORE;
}
```

When enabled, the following are disallowed:

(Each line with a variable will report `Mixins must contain only uppercase letters and underscores` when linted.)

```scss
%HYPHENATED-UPPERCASE {
  content: '';
}

%_snake_case_with_leading_underscore {
  content: '';
}

.foo {
  @extend %camelCase;
}
```
