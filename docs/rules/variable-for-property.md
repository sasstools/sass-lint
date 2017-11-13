# Variable For Property

Rule `variable-for-property` will enforce the use of variables for the values of specified properties.
There are no properties by default, except for reserved words listed below which are always whitelisted:
* inherit
* initial
* transparent
* none
* currentColor

The `!important` flag will also be excluded when used.

## Options

* `properties`: `[array of property names]` (defaults to empty array `[]`)

* `allow-map-get`: `true`/`false` (defaults to `true`) You may allow/disallow the use of `map-get()` as property values

* `allowed-functions`: `[array of function names]` (defaults to empty array `[]`)

You may pass an array of properties you wish to enforce the use of variables for

```yaml

variable-for-property:
  - 1
  -
    'properties':
    - 'margin'
    - 'content'
```

You may pass an array of function names you wish to allow as property values

```yaml

variable-for-property:
  - 1
  -
    'allowed-functions':
    - 'my-map-func'
    - 'palette'
```

*** full config example ***

```yaml
variable-for-property:
  - 1
  -
    allow-map-get: true
    allowed-functions:
      - my-map-func
      - palette
    properties:
      - margin
      - content
```

## Examples

By default `properties` is an empty array and therefore no properties are forced to use variables as values.

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

## [properties: []]

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

## [allow-map-get: true]

When allow-map-get is set to `true` and properties contains the `color` property, the following would be allowed

```scss
.foo {
  color: map-get(blueish, light);
}
```

When allow-map-get is set to `false` and properties contains the `color` property, the following would be disallowed

```scss
.foo {
  color: map-get(blueish, light);
}
```

## [allowed-functions: []]

When `allowed-functions` contains the values shown in the options section and `properties` includes the `color` property the following would be disallowed:

```scss
.foo {
  color: disallowed-function($test, $vars);

  &__element {
    color: invalid-func-name($test, $vars);
  }
}
```

When `allowed-functions` contains the values shown in the options section and `properties` includes the `color` property the following would be disallowed:

```scss
.foo {
  color: my-map-func($allowed);

  &__element {
    color: palette(blue, light);
  }
}

```

## Extra info

The `!important` flag will be excluded from any lint warnings.

For example if `properties` contains the value `color` the following would be disallowed

```scss
.foo {
  color: red !important;
}
```

The following would be allowed

```scss
.foo {
  color: $red-var !important;
}
```
