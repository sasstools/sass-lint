# Mixin Name Format

Rule `mixin-name-format` will enforce a convention for mixin names.

## Options

* `allow-leading-underscore`: `true`/`false` (defaults to `true`)
* `convention`: `'hyphenatedlowercase'` (default), `camelcase`, `snakecase`, [`strictbem`](https://en.bem.info/method/definitions/),
[`hyphenatedbem`](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), or a Regular Expression that the variable name must match (e.g. `^[_A-Z]+$`)
* `convention-explanation`: Custom explanation to display to the user if a mixin doesn't adhere to the convention

## Example 1

Settings:
- `allow-leading-underscore: true`
- `convention: hyphenatedlowercase`

When enabled, the following are allowed:

```scss
@mixin hyphenated-lowercase() {
  content: '';
}

@mixin _leading-underscore() {
  content: '';
}
```

When enabled, the following are disallowed:

```scss
@mixin HYPHENATED-UPPERCASE() {
  content: '';
}

@mixin _camelCaseWithLeadingUnderscore() {
  content: '';
}
```

## Example 2

Settings:
- `allow-leading-underscore: false`
- `convention: camelcase`

When enabled, the following are allowed:

```scss
@mixin camelCase() {
  content: '';
}
```

When enabled, the following are disallowed:

```scss
@mixin HYPHENATED-UPPERCASE() {
  content: '';
}

@mixin _camelCaseWithLeadingUnderscore() {
  content: '';
}
```

## Example 3

Settings:
- `allow-leading-underscore: false`
- `convention: pascalcase`

When enabled, the following are allowed:

```scss
@mixin PascalCase() {
  content: '';
}
```

When enabled, the following are disallowed:

```scss
@mixin HYPHENATED-UPPERCASE() {
  content: '';
}

@mixin _camelCaseWithLeadingUnderscore() {
  content: '';
}
```

## Example 4

Settings:
- `allow-leading-underscore: false`
- `convention: snakecase`

When enabled, the following are allowed:

```scss
@mixin snake_case() {
  content: '';
}
```

When enabled, the following are disallowed:

```scss
@mixin HYPHENATED-UPPERCASE() {
  content: '';
}

@mixin _snake_case_with_leading_underscore() {
  content: '';
}
```

## Example 5

Settings:
- `convention: strictbem`

When enabled, the following are allowed:

```scss
@mixin block-name {
  content: '';
}

@mixin block-name__mixin {
  content: '';
}

@mixin block-name_mod-name {
  content: '';
}
```

When enabled, the following are disallowed:

```scss
@mixin HYPHENATED-UPPERCASE {
  content: '';
}
```

## Example 6

Settings:
- `convention: hyphenatedbem`

When enabled, the following are allowed:

```scss
@mixin block-name {
  content: '';
}

@mixin block-name__mixin {
  content: '';
}

@mixin block-name--mod-name {
  content: '';
}
```

When enabled, the following are disallowed:

```scss
@mixin HYPHENATED-UPPERCASE {
  content: '';
}
```


## Example 7

Settings:
- `allow-leading-underscore: true`
- `convention: ^[_A-Z]+$`
- `convention-explanation: 'Mixins must contain only uppercase letters and underscores'`

When enabled, the following are allowed:

```scss
@mixin SCREAMING_SNAKE_CASE() {
  content: '';
}
```

When enabled, the following are disallowed:

(Each line with a variable will report `Mixins must contain only uppercase letters and underscores` when linted.)

```scss
@mixin HYPHENATED-UPPERCASE() {
  content: '';
}

@mixin _snake_case_with_leading_underscore() {
  content: '';
}
```
