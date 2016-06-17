# Function Name Format

Rule `function-name-format` will enforce a convention for function names.

## Options

* `allow-leading-underscore`: `true`/`false` (defaults to `true`)
* `convention`: `'hyphenatedlowercase'` (default), `camelcase`, `snakecase`, [`strictbem`](https://en.bem.info/method/definitions/),
[`hyphenatedbem`](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), or a Regular Expression that the function name must match (e.g. `^[_A-Z]+$`)
* `convention-explanation`: Custom explanation to display to the user if a function doesn't adhere to the convention

## Example 1

Settings:
- `allow-leading-underscore: true`
- `convention: hyphenatedlowercase`

When enabled, the following are allowed:

```scss
@function hyphenated-lowercase() {
  @return "foo";
}

@function _leading-underscore($x) {
  @return $x;
}

.foo {
  content: hyphenated-lowercase("bar");
}
```

When enabled, the following are disallowed:

```scss
@function HYPHENATED-UPPERCASE() {
  @return "foo";
}

@function _camelCaseWithLeadingUnderscore($x) {
  @return $x;
}

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
@function camelCase() {
  @return "foo";
}

.foo {
  content: anotherCamelCase();
}
```

When enabled, the following are disallowed:

```scss
@function HYPHENATED-UPPERCASE() {
  @return "foo";
}

@function _camelCaseWithLeadingUnderscore() {
  @return "foo";
}

.foo {
  content: snake_case();
}
```

## Example 3

Settings:
- `allow-leading-underscore: false`
- `convention: pascalcase`

When enabled, the following are allowed:

```scss
@function PascalCase() {
  @return "foo";
}

.foo {
  content: AnotherPascalCase();
}
```

When enabled, the following are disallowed:

```scss
@function HYPHENATED-UPPERCASE() {
  @return "foo";
}

@function _camelCaseWithLeadingUnderscore() {
  @return "foo";
}

.foo {
  content: snake_case();
}
```

## Example 4

Settings:
- `allow-leading-underscore: false`
- `convention: snakecase`

When enabled, the following are allowed:

```scss
@function snake_case() {
  @return "foo";
}

.foo {
  content: another_snake_case();
}
```

When enabled, the following are disallowed:

```scss
@function HYPHENATED-UPPERCASE() {
  @return "foo";
}

@function _snake_case_with_leading_underscore() {
  @return "foo";
}

.foo {
  content: camelCase();
}
```

## Example 5

Settings:
- `convention: strictbem`

When enabled, the following are allowed:

```scss
@function namespace__function {
  @return "foo";
}

@function namespace__function_mod-name {
  @return "foo";
}

@function namespace_mod-name__function {
  @return "foo";
}
```

When enabled, the following are disallowed:

```scss
@function HYPHENATED-UPPERCASE {
  @return "foo";
}

.foo {
  content: camelCase();
}
```

## Example 6

Settings:
- `convention: hyphenatedbem`

When enabled, the following are allowed:

```scss
@function namespace__function {
  @return "foo";
}

@function namespace__function--mod-name {
  @return "foo";
}

@function namespace--mod-name__function {
  @return "foo";
}
```

When enabled, the following are disallowed:

```scss
@function HYPHENATED-UPPERCASE {
  @return "foo";
}

.foo {
  content: camelCase();
}
```

## Example 7

Settings:
- `allow-leading-underscore: true`
- `convention: '^[_A-Z]+$'`
- `convention-explanation: 'Functions must contain only uppercase letters and underscores'`

When enabled, the following are allowed:

```scss
@function SCREAMING_SNAKE_CASE() {
  @return "foo";
}

.foo {
  content: _LEADING_UNDERSCORE();
}
```

When enabled, the following are disallowed:

(Each line with a function call/declaration will report `Functions must contain only uppercase letters and underscores` when linted.)

```scss
@function HYPHENATED-UPPERCASE() {
  @return "foo";
}

@function _snake_case_with_leading_underscore() {
  @return "foo";
}

.foo {
  content: camelCase();
}
```
