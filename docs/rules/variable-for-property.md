# Variable For Property

Rule `variable-for-property` will enforce the use of variables for the values of specified properties.
There are no properties by default, except for reserved words listed below which are always whitelisted:
* inherit
* initial
* transparent
* none
* currentColor

## Options

* `properties`: `[array of property names]` (defaults to empty array `[]`)

You may pass an array of properties you wish to enforce the use of variables for

```yaml

variable-for-property:
  - 1
  -
    'properties':
    - 'margin'
    - 'content'
```

## Examples

By default `properties` is an empty array and therefore no properties are forced to use variables as values.

When `properties` contains the values shown in the options section example the following would be disallowed:

```scss
.bar {
  content: ' ';
  margin: 0;

  &__element {
    margin: 0;
  }
}

@mixin red() {
  margin: 0;
}
```

When `properties` contains the values shown in the options section example the following would be allowed:

```scss
.foo {
  content: $content;
  margin: $margin;

  &__element {
    margin: $margin;
  }
}

@mixin blue() {
  margin: $margin;
}

```
