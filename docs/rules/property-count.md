# Property Count

Rule `property-count` will enforce the maximum number of properties allowed within a ruleset. This can include or exclude a cumulative count of nested properties also.

## Options

* `max-properties`: number (defaults to `0`)
* `include-nested`: `true`/`false` (defaults to `false`)

## Examples

When `max-properties: '2'`, the following are allowed.

```scss
.foo {
  content: '';
  display: block;
}

.nest {
  content: '';
  display: block;

  .nest-child {
    content: '';
    display: block;
  }
}
```
When `max-properties: '2'`, the following are disallowed.

```scss
.foo { // lint reported
  content: '';
  display: block;
  color: red;
}

.nest { // lint reported
  content: '';
  display: block;
  color: red;

  .nest-child { // lint reported
    content: '';
    display: block;
    color: red;
  }
}
```

When `max-properties: 2` and `include-nested: true`, the following are allowed.

```scss
.foo {
  content: '';
  display: block;
}

.nest { // nested property count of 2
  content: '';

  .nest-child {
    content: '';
  }
}
```

When `max-properties: 2` and `include-nested: true`, the following are disallowed.

```scss
.foo { // lint reported
  content: '';
  display: block;
  color: red;
}

.nest { // lint reported - nested property count of 3
  content: '';

  .nest-child {
    content: '';
    color: red
  }
}

.nest-other { // lint reported - nested property count of 3
  content: '';

  .nest-other-child {
    content: '';
  }

  .nest-other-child-sibling {
    display: block;
  }
}
```

#### Special Case - `max-properties: 0`

As there is no perceived best practice for a maximum number of properties per ruleset the default for `max-properties` is 0. This effectively leaves the rule disabled and should therefore always be customised by the end user.


When `max-properties: '0'`, the following are allowed.

```scss
.foo {
  content: '';
  display: block;
}

.nest {
  content: '';
  display: block;

  .nest-child {
    content: '';
    display: block;
  }
}
```
