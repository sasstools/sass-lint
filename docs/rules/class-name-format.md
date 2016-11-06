# Class Name Format

Rule `class-name-format` will enforce a convention for class names.

## Options

* `allow-leading-underscore`: `true`/`false` (defaults to `true`)
* `convention`: `'hyphenatedlowercase'` (default), `camelcase`, `snakecase`, [`strictbem`](https://en.bem.info/method/definitions/),
[`hyphenatedbem`](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/),
or a Regular Expression that the class name must match (e.g. `^[_A-Z]+$`)
* `convention-explanation`: Custom explanation to display to the user if a class doesn't adhere to the convention
* `ignore`: Array of names to ignore

## Example 1

Settings:
- `allow-leading-underscore: true`
- `convention: hyphenatedlowercase`

When enabled, the following are allowed:

```scss
.hyphenated-lowercase {
  content: '';

  &._with-leading-underscore {
    content: '';
  }
}

.foo {
  @extend .hyphenated-lowercase;
}

```

When enabled, the following are disallowed:

```scss
.HYPHENATED-UPPERCASE {
  content: '';
}

.camelCase {
  content: '';

  @extend .snake_case;
}
```

## Example 2

Settings:
- `allow-leading-underscore: false`
- `convention: hyphenatedlowercase`

When enabled, the following are allowed:

```scss
.hyphenated-lowercase {
  content: '';

  &.another-hyphenated-lowercase {
    content: '';
  }
}

.foo {
  @extend .hyphenated-lowercase;
}

```

When enabled, the following are disallowed:

```scss
._with-leading-underscore {
  content: '';
}

.HYPHENATED-UPPERCASE {
  content: '';
}

.camelCase {
  content: '';

  @extend .snake_case;
}
```

## Example 3

Settings:
- `convention: camelcase`

When enabled, the following are allowed:

```scss
.camelCase {
  content: '';
}

.foo {
  @extend .anotherCamelCase;
}
```

When enabled, the following are disallowed:

```scss
.HYPHENATED-UPPERCASE {
  content: '';
}

.foo {
  @extend .snake_case;
}
```

## Example 4

Settings:
- `convention: pascalcase`

When enabled, the following are allowed:

```scss
.PascalCase {
  content: '';
}

.Foo {
  @extend .AnotherPascalCase;
}
```

When enabled, the following are disallowed:

```scss
.HYPHENATED-UPPERCASE {
  content: '';
}

.foo {
  @extend .snake_case;
}
```

## Example 5

Settings:
- `convention: snakecase`

When enabled, the following are allowed:

```scss
.snake_case {
  content: '';
}

.foo {
  @extend .another_snake_case;
}
```

When enabled, the following are disallowed:

```scss
.HYPHENATED-UPPERCASE {
  content: '';
}

.foo {
  @extend .camelCase;
}
```

## Example 6

Settings:
- `convention: strictbem`

When enabled, the following are allowed:

```scss
.block-name__elem-name {
  content: '';
}

.owner-name_mod-name_mod-val {
  content: '';
}

.block-name__elem-name_mod-bool {
  content: '';
}
```

When enabled, the following are disallowed:

```scss
.HYPHENATED-UPPERCASE {
  content: '';
}

.foo {
  @extend .camelCase;
}
```

## Example 7

Settings:
- `convention: hyphenatedbem`

When enabled, the following are allowed:

```scss
.site-search {
  color: blue;
  width: 50px;
  height: 100%;
}

.site-search__field {
  text-decoration: underline;
}

.site-search--full {
  color: green;
}
```

When enabled, the following are disallowed:

```scss
.HYPHENATED-UPPERCASE {
  content: '';
}

.foo {
  @extend .camelCase;
}
```

## Example 8

Settings:
- `convention: ^[_A-Z]+$`
- `convention-explanation: 'Class must contain only uppercase letters and underscores'`

When enabled, the following are allowed:

```scss
.SCREAMING_SNAKE_CASE {
  content: '';
}

.foo {
  @extend .SCREAMING_SNAKE_CASE;
}
```

When enabled, the following are disallowed:

(Each line with a class will report `Class must contain only uppercase letters and underscores` when linted.)

```scss
.HYPHENATED-UPPERCASE {
  content: '';
}

.snake_case {
  content: '';
}

.foo {
  @extend .camelCase;
}
```
