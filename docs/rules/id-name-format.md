# ID Name Format

Rule `id-name-format` will enforce a convention for ids.

## Options

* `allow-leading-underscore`: `true`/`false` (defaults to `true`)
* `convention`: `'hyphenatedlowercase'` (default), `camelcase`, `snakecase`,
or a Regular Expression that the id name must match (e.g. `^[_A-Z]+$`)
* `convention-explanation`: Custom explanation to display to the user if an id doesn't adhere to the convention
* `ignore`: Array of names to ignore

## Example 1

Settings:
- `allow-leading-underscore: true`
- `convention: hyphenatedlowercase`
- `ignore: ['IGNORED_SELECTOR']`

When enabled, the following are allowed:

```scss
#hyphenated-lowercase {
  content: '';

  &#_with-leading-underscore {
    content: '';
  }
}

#foo {
  @extend #hyphenated-lowercase;
}

#IGNORED_SELECTOR {
  content: '';
}

```

When enabled, the following are disallowed:

```scss
#HYPHENATED-UPPERCASE {
  content: '';
}

#camelCase {
  content: '';

  @extend #snake_case;
}
```

## Example 2

Settings:
- `allow-leading-underscore: false`
- `convention: hyphenatedlowercase`

When enabled, the following are allowed:

```scss
#hyphenated-lowercase {
  content: '';

  &#another-hyphenated-lowercase {
    content: '';
  }
}

#foo {
  @extend #hyphenated-lowercase;
}

```

When enabled, the following are disallowed:

```scss
#_with-leading-underscore {
  content: '';
}

#HYPHENATED-UPPERCASE {
  content: '';
}

#camelCase {
  content: '';

  @extend #snake_case;
}
```

## Example 3

Settings:
- `convention: camelcase`

When enabled, the following are allowed:

```scss
#camelCase {
  content: '';
}

#foo {
  @extend #anotherCamelCase;
}
```

## Example 4

Settings:
- `convention: pascalcase`

When enabled, the following are allowed:

```scss
#PascalCase {
  content: '';
}

#Foo {
  @extend #AnotherPascalCase;
}
```

When enabled, the following are disallowed:

```scss
#HYPHENATED-UPPERCASE {
  content: '';
}

#foo {
  @extend #snake_case;
}
```

## Example 5

Settings:
- `convention: snakecase`

When enabled, the following are allowed:

```scss
#snake_case {
  content: '';
}

#foo {
  @extend #another_snake_case;
}
```

When enabled, the following are disallowed:

```scss
#HYPHENATED-UPPERCASE {
  content: '';
}

#foo {
  @extend #camelCase;
}
```

## Example 6

Settings:
- `convention: ^[_A-Z]+$`
- `convention-explanation: 'IDs must contain only uppercase letters and underscores'`

When enabled, the following are allowed:

```scss
#SCREAMING_SNAKE_CASE {
  content: '';
}

#FOO {
  @extend #SCREAMING_SNAKE_CASE;
}
```

When enabled, the following are disallowed:

(Each line with an id will report `IDs must contain only uppercase letters and underscores` when linted.)

```scss
#HYPHENATED-UPPERCASE {
  content: '';
}

#snake_case {
  content: '';
}

#foo {
  @extend #camelCase;
}
```
